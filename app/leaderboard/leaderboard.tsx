"use client";

import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

const timePeriods = [
	{
		label: "Daily",
		value: "daily",
		description: "today",
	},
	{
		label: "Weekly",
		value: "weekly",
		description: "this week",
	},
	{
		label: "Lifetime",
		value: "lifetime",
		description: "overall",
	},
] as const;

export default function Leaderboard() {
	const [timePeriod, setTimePeriod] =
		useState<(typeof timePeriods)[number]["value"]>("daily");
	const trpc = useTRPC();
	const { data, isLoading } = useSuspenseQuery(
		trpc.danagram.getLeaderboard.queryOptions(),
	);

	const router = useRouter();
	const timePeriodData = timePeriods.find(
		(period) => period.value === timePeriod,
	);

	return (
		<div className="mx-auto max-w-4xl p-4 sm:p-8">
			<h1 className="mb-8 text-center text-6xl text-stone-800 sm:text-7xl">
				Leaderboard
			</h1>

			{/* Time Period Selector */}
			<div className="mb-6 flex justify-center gap-2">
				{timePeriods.map((period) => (
					<Button
						key={period.value}
						onClick={() => setTimePeriod(period.value)}
						variant={timePeriod === period.value ? "primary" : "inverted"}
						size="default"
					>
						{period.label}
					</Button>
				))}
			</div>

			<div className="border-4 border-stone-800 bg-slate-100 p-6 shadow-[6px_6px_0px_theme(colors.stone.800)]">
				{isLoading ? (
					<Loader text="Loading scores..." />
				) : data[timePeriod].length === 0 ? (
					<div className="py-8 text-center text-stone-600 text-xl">
						No puzzles have been solved {timePeriodData?.description}.
					</div>
				) : (
					<div className="space-y-4">
						{data[timePeriod].map((entry, index) => (
							<div
								key={entry.user?.id}
								className="flex items-center gap-4 border-4 border-stone-800 bg-slate-50 p-4 shadow-[4px_4px_0px_theme(colors.stone.800)]"
							>
								{/* Position Indicator */}
								<div className="flex h-16 w-16 items-center justify-center border-4 border-slate-400 bg-slate-50 font-bold text-3xl text-stone-800 shadow-[3px_3px_0px_theme(colors.stone.800)]">
									{index + 1}
								</div>

								{/* Player Info */}
								<div className="flex-grow">
									<h3 className="text-2xl text-stone-800">
										{entry.user?.name}
									</h3>
									<p className="text-stone-600 text-xl">
										Solved {entry.completed}{" "}
										{entry.completed === 1 ? "puzzle" : "puzzles"}{" "}
										{timePeriodData?.description}
									</p>
								</div>

								{/* Score */}
								<div className="font-bold text-4xl text-stone-800">
									{entry.score}
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Back to Game Button at the bottom */}
			<div className="mt-8 flex justify-start">
				<Button variant="inverted" asChild>
					<a href="/">← Back to Game</a>
				</Button>
			</div>
		</div>
	);
}
