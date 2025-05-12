import { protectedProcedure, createTRPCRouter } from "../init";
import { startOfDay } from "date-fns";

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

		return {
			anagram: dailyAssignment.word.anagram,
			solution: userHasCompleted ? dailyAssignment.word.originalWord : null,
			guessesMade: attemptsForUser.length,
			score: 0, // TODO: Implement scoring
			hasCompletedToday: userHasCompleted,
		};
	}),
});
