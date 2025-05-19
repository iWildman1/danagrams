import { startOfDay } from "date-fns";
import { z } from "zod";
import { protectedProcedure, createTRPCRouter } from "../init";
import { TRPCError } from "@trpc/server";

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

			const alreadySolved = !!dailyAssignment.attempts.find(
				(attempt) => attempt.score > 0,
			);

			if (alreadySolved) {
				throw new TRPCError({ code: "BAD_REQUEST", message: "Already solved" });
			}

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
						score,
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
	getLeaderboard: protectedProcedure.query(async ({ ctx }) => {
		const today = startOfDay(new Date());
		const weekStart = startOfDay(
			new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
		);

		const [daily, weekly, lifetime] = await Promise.all([
			ctx.db.userAttempt.groupBy({
				by: ["userId"],
				where: {
					score: { gt: 0 },
					dailyAssignment: { date: today },
				},
				_sum: { score: true },
				_count: { dailyAssignmentId: true },
			}),
			ctx.db.userAttempt.groupBy({
				by: ["userId"],
				where: {
					score: { gt: 0 },
					dailyAssignment: { date: { gte: weekStart } },
				},
				_sum: { score: true },
				_count: { dailyAssignmentId: true },
			}),
			ctx.db.userAttempt.groupBy({
				by: ["userId"],
				where: { score: { gt: 0 } },
				_sum: { score: true },
				_count: { dailyAssignmentId: true },
			}),
		]);

		const userIds = [
			...new Set([
				...daily.map((d) => d.userId),
				...weekly.map((w) => w.userId),
				...lifetime.map((l) => l.userId),
			]),
		];

		const users = await ctx.db.user.findMany({
			where: { id: { in: userIds } },
			select: { id: true, name: true, image: true },
		});

		function leaderboardFromEntries(
			entries: {
				userId: string;
				_sum: { score: number | null };
				_count: { dailyAssignmentId: number };
			}[],
		) {
			return entries
				.map((entry) => ({
					user: users.find((u) => u.id === entry.userId),
					score: entry._sum.score || 0,
					completed: entry._count.dailyAssignmentId,
				}))
				.sort((a, b) => b.score - a.score);
		}

		return {
			daily: leaderboardFromEntries(daily),
			weekly: leaderboardFromEntries(weekly),
			lifetime: leaderboardFromEntries(lifetime),
		};
	}),
});

function calculateScore(guessesMade: number) {
	return Math.max(1000 - (guessesMade - 1) * 100, 1);
}
