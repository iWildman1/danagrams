import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
	hello: baseProcedure
		.input(
			z.object({
				text: z.string(),
			}),
		)
		.query(async (opts) => {
			console.log(await opts.ctx.db.word.findMany());

			return {
				greeting: `Hello ${opts.input.text}`,
			};
		}),
});
// export type definition of API
export type AppRouter = typeof appRouter;
