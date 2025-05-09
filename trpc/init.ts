import { initTRPC } from '@trpc/server';
import { cache } from 'react';
import superjson from 'superjson';

// eslint-disable-next-line @typescript-eslint/require-await
export const createTRPCContext = cache(async () =>
  /**
   * @see: https://trpc.io/docs/server/context
   */
  ({ userId: 'user_123' })
);

const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson
});

export const createTRPCRouter = t.router;
export const { createCallerFactory } = t;
export const baseProcedure = t.procedure;
