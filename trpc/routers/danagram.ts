import { startOfDay } from "date-fns";
import { z } from "zod";
import { protectedProcedure, createTRPCRouter } from "../init";

export const danagramRouter = createTRPCRouter({
	getDailyState: protectedProcedure.query(async ({ ctx }) => {
		// Get today's date (UTC)
		const today = startOfDay(new Date());

		// Get or create today's assignment
		let dailyAssignment = await ctx.db.dailyAssignment.findUnique({
			where: { date: today },
			include: { word: true },
		});

		if (!dailyAssignment) {
			// Get random unassigned word
			const randomWord = await ctx.db.word.findFirst({
				where: {
					assignments: { none: {} },
				},
			});

			if (!randomWord) throw new Error("No words available");

			dailyAssignment = await ctx.db.dailyAssignment.create({
				data: {
					date: today,
					wordId: randomWord.id,
				},
				include: { word: true },
			});
		}

		const attemptsForUser = await ctx.db.userAttempt.findMany({
			where: {
				userId: ctx.session.user.id,
				dailyAssignmentId: dailyAssignment.id,
			},
		});

		const userHasCompleted = !!attemptsForUser.find(
			(attempt) => attempt.guess === dailyAssignment.word.originalWord,
		);

		const highestPossibleScore = calculateScore(attemptsForUser.length + 1);

		return {
			anagram: dailyAssignment.word.anagram,
			solution: userHasCompleted ? dailyAssignment.word.originalWord : null,
			guessesMade: attemptsForUser,
			highestPossibleScore,
			hasCompletedToday: userHasCompleted,
		};
	}),
	submitGuess: protectedProcedure
		.input(z.object({ guess: z.string() }))
		.mutation(async ({ input, ctx }) => {
			const today = startOfDay(new Date());

			const dailyAssignment = await ctx.db.dailyAssignment.findUniqueOrThrow({
				where: { date: today },
				include: {
					word: true,
					attempts: { where: { userId: ctx.session.user.id } },
				},
			});

			// User guess was correct
			if (
				dailyAssignment.word.originalWord.toLowerCase() ===
				input.guess.toLowerCase()
			) {
				const score = calculateScore(dailyAssignment.attempts.length + 1);

				await ctx.db.userAttempt.create({
					data: {
						guess: input.guess,
						userId: ctx.session.user.id,
						dailyAssignmentId: dailyAssignment.id,
					},
				});

				return { success: true, score };
			}

			// User guess was incorrect
			await ctx.db.userAttempt.create({
				data: {
					guess: input.guess,
					userId: ctx.session.user.id,
					dailyAssignmentId: dailyAssignment.id,
					score: 0,
				},
			});

			return { success: false, score: 0 };
		}),
});

function calculateScore(guessesMade: number) {
	return Math.max(1000 - (guessesMade - 1) * 100, 1);
}
