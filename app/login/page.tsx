import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { LargeLogo } from "@/components/LargeLogo";
import { auth } from "@/utils/auth";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
	const heads = await headers();

	const session = await auth.api.getSession({
		headers: heads,
	});

	if (session) {
		redirect("/");
	}

	return (
		<main className="container mx-auto max-w-xl px-4 py-8">
			<div className="mb-12 border-stone-800">
				<LargeLogo />
			</div>
			<LoginForm />
		</main>
	);
}
