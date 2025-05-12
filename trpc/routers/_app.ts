import { createTRPCRouter } from "../init";
import { danagramRouter } from "./danagram";

export const appRouter = createTRPCRouter({
	danagram: danagramRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
