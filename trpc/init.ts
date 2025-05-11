import { initTRPC } from "@trpc/server";
import superjson from "superjson";

import { headers } from "next/headers";

import { db } from "@/server/db";

// eslint-disable-next-line @typescript-eslint/require-await
export const createTRPCContext = async () => {
	const h = await headers();

	console.log(h.forEach((v, k) => console.log(k, v)));

	return {
		db,
	};
};

const t = initTRPC.context<typeof createTRPCContext>().create({
	/**
	 * @see https://trpc.io/docs/server/data-transformers
	 */
	transformer: superjson,
});

export const createTRPCRouter = t.router;
export const { createCallerFactory } = t;
export const baseProcedure = t.procedure;
