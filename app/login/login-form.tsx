"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { authClient } from "@/utils/auth-client";

const loginSchema = z.object({
	username: z.string().min(1, "Username is required"),
	password: z.string().min(1, "Password is required"),
});

export function LoginForm() {
	const router = useRouter();

	const { register, handleSubmit } = useForm({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: z.infer<typeof loginSchema>) => {
		await authClient.signIn.email(
			{
				email: data.username,
				password: data.password,
			},
			{
				onSuccess() {
					router.push("/");
				},
				onError() {
					alert("Login failed");
				},
			},
		);
	};

	return (
		<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label
					htmlFor="username"
					className="mb-2 block text-stone-800 text-xl sm:text-2xl"
				>
					Username
				</label>
				<Input
					type="text"
					id="username"
					placeholder="Enter your username"
					{...register("username")}
					required
				/>
			</div>

			<div>
				<label
					htmlFor="password"
					className="mb-2 block text-stone-800 text-xl sm:text-2xl"
				>
					Password
				</label>
				<Input
					type="password"
					id="password"
					placeholder="Enter your password"
					{...register("password")}
					required
				/>
				<div className="mt-2">
					<a
						href="/forgot-password"
						className="text-lg text-stone-600 hover:text-stone-800"
					>
						Forgot password?
					</a>
				</div>
			</div>

			<div className="pt-4">
				<Button type="submit" variant="primary" size="full">
					Login
				</Button>
			</div>
		</form>
	);
}
