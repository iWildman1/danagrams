"use client";

import { useState } from "react";
import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function Game() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const gameState = useSuspenseQuery(
		trpc.danagram.getDailyState.queryOptions(),
	);

	const [guess, setGuess] = useState("");

	const submitGuessMutation = useMutation(
		trpc.danagram.submitGuess.mutationOptions({
			onError: () => {
				setGuess("");
				toast.error("Failed to submit guess");
			},
			onSuccess: () => {
				setGuess("");
				queryClient.invalidateQueries({
					queryKey: trpc.danagram.getDailyState.queryKey(),
				});
			},
		}),
	);

	return (
		<main className="container mx-auto max-w-4xl px-4 py-8">
			<div className="border-4 border-stone-800 bg-slate-100 p-6 shadow-[6px_6px_0px_theme(colors.stone.800)]">
				<p className="mb-4 text-stone-600 text-xl">Unscramble the letters:</p>
				<div className="mb-6 flex justify-center space-x-2 sm:space-x-3">
					{gameState.data.anagram.split("").map((letter, index) => (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: We aren't reodering, this is fine
							key={index}
							className="flex h-12 w-12 items-center justify-center border-4 border-slate-400 bg-slate-50 text-3xl text-stone-800 shadow-[3px_3px_0px_theme(colors.stone.800)] sm:h-16 sm:w-16 sm:text-4xl"
						>
							{letter.toUpperCase()}
						</div>
					))}
				</div>
				<div>
					<label
						htmlFor="anagram-guess"
						className="mb-2 block text-xl sm:text-2xl"
					>
						Your Guess:
					</label>
					<Input
						type="text"
						id="anagram-guess"
						placeholder="Enter your solution"
						className="mb-4"
						value={guess}
						onChange={(e) => setGuess(e.target.value)}
					/>
					<Button
						variant="primary"
						size="full"
						disabled={submitGuessMutation.isPending}
						onClick={() => submitGuessMutation.mutate({ guess })}
					>
						Submit Guess
					</Button>
				</div>
			</div>

			<div className="mt-10 border-4 border-stone-800 bg-slate-100 p-6 shadow-[6px_6px_0px_theme(colors.stone.800)]">
				<h3 className="mb-3 text-3xl">Today's Guesses</h3>
				<div className="space-y-2">
					{gameState.data.guessesMade.length > 0 ? (
						gameState.data.guessesMade.map((guess) => (
							<p key={guess.id} className="text-rose-500 text-xl">
								✗ {guess.guess}
							</p>
						))
					) : (
						<p className="text-xl">No guesses made</p>
					)}
				</div>
			</div>

			<div className="mt-10 border-4 border-stone-800 bg-slate-100 p-6 shadow-[6px_6px_0px_theme(colors.stone.800)]">
				<h3 className="mb-3 text-3xl">Today's Stats</h3>
				<p className="mb-1 text-xl">
					Guesses Made:{" "}
					<span className="text-lime-600">
						{gameState.data.guessesMade.length}
					</span>
				</p>
				<p className="text-xl">
					Maximum Possible Score:{" "}
					<span className="text-rose-500">
						{gameState.data.highestPossibleScore}
					</span>
				</p>
				<div className="mt-6">
					<Button variant="primary" asChild>
						<a href="/leaderboard">View Leaderboard</a>
					</Button>
				</div>
			</div>
		</main>
	);
}
