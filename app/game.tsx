"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export default function Game() {
	const trpc = useTRPC();
	const gameState = useSuspenseQuery(
		trpc.danagram.getDailyState.queryOptions(),
	);

	return (
		<div>
			<pre>{JSON.stringify(gameState.data, null, 2)}</pre>
		</div>
	);
}
