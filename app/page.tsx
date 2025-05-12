import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import { auth } from "@/utils/auth";
import Game from "./game";

export default async function Home() {
	const heads = await headers();

	const session = await auth.api.getSession({
		headers: heads,
	});

	if (!session) {
		redirect("/login");
	}

	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(trpc.danagram.getDailyState.queryOptions());

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div>logged in as {session.user.email}</div>
			<Suspense fallback={<div>Loading...</div>}>
				<Game />
			</Suspense>
		</HydrationBoundary>
	);
}
