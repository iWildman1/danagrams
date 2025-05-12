import { headers } from "next/headers";
import superjson from "superjson";
import { initTRPC, TRPCError } from "@trpc/server";
import { db } from "@/server/db";
import { auth } from "@/utils/auth";

export const createTRPCContext = async () => {
	const internalHeaders = await headers();

	const formattedHeaders = new Headers(internalHeaders);

	const session = await auth.api.getSession({
		headers: formattedHeaders,
	});

	return {
		db,
		session,
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

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
	if (!ctx.session) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}

	return next({
		ctx: {
			session: ctx.session,
		},
	});
});
