import { hashPassword } from "better-auth/crypto";
import dotenv from "dotenv";
import path from "node:path";
import { auth } from "@/utils/auth";

dotenv.config({ path: path.join(__dirname, "../.env") });

const sampleUsers = [
	{
		name: process.env.DAN_NAME as string,
		email: process.env.DAN_EMAIL_ADDRESS as string,
		password: process.env.DAN_DEFAULT_PASSWORD as string,
	},
	{
		name: process.env.KATY_NAME as string,
		email: process.env.KATY_EMAIL_ADDRESS as string,
		password: process.env.KATY_DEFAULT_PASSWORD as string,
	},
] as const;

export async function seedUsers() {
	console.log("🌱 Seeding users...");

	for (const userData of sampleUsers) {
		const hashedPassword = await hashPassword(userData.password);

		const ctx = await auth.$context;

		const user = await ctx.internalAdapter.createUser({
			email: userData.email,
			name: userData.name,
			emailVerified: true,
		});

		await ctx.internalAdapter.createAccount({
			accountId: user.id,
			providerId: "credential",
			userId: user.id,
			password: hashedPassword,
		});

		console.log(`Created user ${user.email}`);
	}

	console.log("✅ Seeding users complete");
}

seedUsers().catch((error) => {
	console.error("Error seeding users:", error);
	process.exit(1);
});
