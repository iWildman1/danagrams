import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/server/db";

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
		disableSignUp: true,
	},
	database: prismaAdapter(db, { provider: "sqlite" }),
});
