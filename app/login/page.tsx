import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { LargeLogo } from "@/components/LargeLogo";

export default function LoginPage() {
	return (
		<main className="container mx-auto max-w-xl px-4 py-8">
			<div className="mb-12 border-stone-800">
				<LargeLogo />
			</div>

			<form className="space-y-6">
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
						required
					/>
				</div>

				<div className="pt-4">
					<Button type="submit" variant="primary" size="full">
						Login
					</Button>
				</div>
			</form>
		</main>
	);
}
