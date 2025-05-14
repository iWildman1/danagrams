import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import { auth } from "@/utils/auth";
import { LargeLogo } from "@/components/LargeLogo";
import { Loader } from "@/components/Loader";
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
			<div className="container mx-auto max-w-4xl px-4 py-8">
				<div className="mx-auto mb-12 max-w-xl">
					<LargeLogo />
				</div>
				<Suspense
					fallback={
						<div className="mt-12 text-center">
							<Loader />
						</div>
					}
				>
					<Game />
				</Suspense>
			</div>
		</HydrationBoundary>
	);
}
