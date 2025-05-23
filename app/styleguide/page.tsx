// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Loader } from "@/components/Loader";

// Define the color palette for easy reference and consistency
const colors = {
	// For gradient, we apply it directly to the main div. This is for reference.
	backgroundGradient: "bg-gradient-to-br from-teal-200 to-sky-200",
	textPrimary: "text-stone-800",
	textSecondary: "text-stone-600",
	borderPrimary: "border-stone-800",
	accentPrimary: "bg-lime-600",
	accentPrimaryHover: "hover:bg-lime-700",
	accentSecondary: "bg-rose-500",
	accentSecondaryHover: "hover:bg-rose-600",
	inputBackground: "bg-slate-100", // Neutral light gray for inputs, works with gradient
	inputFocusBorder: "focus:border-lime-700",
	shadowColor: "shadow-stone-800",
	shadowColorJs: "#44403c", // stone-800 hex for dynamic shadow
	subtleButtonHoverBg: "hover:bg-slate-200", // Hover for subtle buttons on a neutral input-like bg
	scrollbarTrackBg: "slate-100", // Tailwind color name for slate-100
	letterTileBg: "bg-slate-50", // Background for anagram letter tiles
	letterTileBorder: "border-slate-400", // Border for anagram letter tiles
	loaderDotBg: "bg-lime-600", // Color for loader dots
};

// Helper function to generate the pixelated shadow style string
// Tailwind JIT needs full class names, but for dynamic shadows, this can be useful
// However, for this example, we'll use Tailwind's theme() for direct shadow color
const pixelShadow = (color = colors.shadowColorJs) => `4px 4px 0px ${color}`;
const activePixelShadow = (color = colors.shadowColorJs) =>
	`1px 1px 0px ${color}`;

function RouteComponent() {
	const [isLoading, setIsLoading] = useState(true);
	const exampleAnagram = "DANAGRM"; // Example anagram

	// Simulate loading for the loader example
	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 5000); // Show loader for 5 seconds
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className={`${colors.textPrimary} min-h-screen p-4 sm:p-8`}>
			<style>
				{`
            /* Custom scrollbar for a more pixelated feel - optional */
            ::-webkit-scrollbar {
              width: 12px;
              height: 12px;
            }
            ::-webkit-scrollbar-track {
              background: #${tailwindColors[colors.scrollbarTrackBg.split("-")[0]][colors.scrollbarTrackBg.split("-")[1]]};
              border: 2px solid ${colors.shadowColorJs};
            }
            ::-webkit-scrollbar-thumb {
              background: ${tailwindColors.lime[600]};
              border: 2px solid ${colors.shadowColorJs};
            }
            ::-webkit-scrollbar-thumb:hover {
              background: ${tailwindColors.lime[700]};
            }
          `}
			</style>

			<header className="text-center mb-12">
				<h1 className={`text-6xl sm:text-7xl ${colors.textPrimary} mb-2`}>
					Danagrams
				</h1>
				<p className={`${colors.textSecondary} text-2xl`}>
					Style Guide (Gradient Theme)
				</p>
			</header>

			<div className="space-y-12 max-w-4xl mx-auto">
				{/* Typography Section (Existing) */}
				<section>
					<h2
						className={`text-4xl sm:text-5xl ${colors.textPrimary} border-b-4 ${colors.borderPrimary} pb-2 mb-6`}
					>
						Typography
					</h2>
					<div className="space-y-4">
						<h1 className="text-5xl sm:text-6xl">Heading 1: Daily Puzzle</h1>
						<h2 className="text-4xl sm:text-5xl">Heading 2: Player Scores</h2>
						{/* ... other typography elements ... */}
						<p className="text-lg sm:text-xl leading-relaxed">
							Body Text: Welcome to Danagrams, the daily anagram puzzle game
							created just for Dan and his fiancée!
						</p>
					</div>
				</section>

				{/* Anagram Display and Input Section - NEW */}
				<section>
					<h2
						className={`text-4xl sm:text-5xl ${colors.textPrimary} border-b-4 ${colors.borderPrimary} pb-2 mb-6`}
					>
						Today's Danagram
					</h2>
					<div
						className={`p-6 ${colors.inputBackground} border-4 ${colors.borderPrimary} shadow-[6px_6px_0px_theme(colors.stone.800)]`}
					>
						<p className={`${colors.textSecondary} text-xl mb-4`}>
							Unscramble the letters:
						</p>
						<div className="flex justify-center space-x-2 sm:space-x-3 mb-6">
							{exampleAnagram.split("").map((letter, index) => (
								<div
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={index}
									className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center 
                                ${colors.letterTileBg} ${colors.textPrimary} text-3xl sm:text-4xl 
                                border-4 ${colors.letterTileBorder} 
                                shadow-[3px_3px_0px_theme(colors.stone.800)]`}
								>
									{letter}
								</div>
							))}
						</div>
						<div>
							<label
								htmlFor="anagram-guess"
								className="block text-xl sm:text-2xl mb-2"
							>
								Your Guess:
							</label>
							<Input
								type="text"
								id="anagram-guess"
								placeholder="Enter your solution"
								className="mb-4"
							/>
							<Button variant="primary" size="full">
								Submit Guess
							</Button>
						</div>
					</div>
				</section>

				{/* Buttons Section (Updated) */}
				<section>
					<h2
						className={`text-4xl sm:text-5xl ${colors.textPrimary} border-b-4 ${colors.borderPrimary} pb-2 mb-6`}
					>
						Buttons
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-start">
						<div>
							<p className={`${colors.textSecondary} mb-2 text-lg`}>
								Primary Button:
							</p>
							<Button variant="primary">Submit Guess</Button>
						</div>

						<div>
							<p className={`${colors.textSecondary} mb-2 text-lg`}>
								Secondary Button:
							</p>
							<Button variant="secondary">Nudge Player!</Button>
						</div>

						<div>
							<p className={`${colors.textSecondary} mb-2 text-lg`}>
								Subtle Button:
							</p>
							<Button variant="subtle">View Rules</Button>
						</div>

						<div>
							<p className={`${colors.textSecondary} mb-2 text-lg`}>
								Disabled Button:
							</p>
							<Button variant="primary" disabled>
								No Guesses Left
							</Button>
						</div>

						<div>
							<p className={`${colors.textSecondary} mb-2 text-lg`}>
								Small Button:
							</p>
							<Button variant="secondary" size="small">
								Quick Action
							</Button>
						</div>

						<div>
							<p className={`${colors.textSecondary} mb-2 text-lg`}>
								Full Width:
							</p>
							<Button variant="primary" size="full">
								Wide Button
							</Button>
						</div>
					</div>
				</section>

				{/* Text Inputs Section (Existing) */}
				<section>
					<h2
						className={`text-4xl sm:text-5xl ${colors.textPrimary} border-b-4 ${colors.borderPrimary} pb-2 mb-6`}
					>
						Text Inputs
					</h2>
					{/* ... text input examples ... */}
					<div className="space-y-6">
						<div>
							<label
								htmlFor="guess-example"
								className="block text-xl sm:text-2xl mb-2"
							>
								Your Guess:
							</label>
							<Input
								type="text"
								id="guess-example"
								placeholder="Enter anagram solution"
							/>
						</div>
						<div>
							<label
								htmlFor="username-example"
								className="block text-xl sm:text-2xl mb-2"
							>
								Username (Disabled):
							</label>
							<Input
								type="text"
								id="username-example"
								defaultValue="DanTheMan"
								disabled
							/>
						</div>
					</div>
				</section>

				{/* Loading Indicator Section */}
				<section>
					<h2
						className={`text-4xl sm:text-5xl ${colors.textPrimary} border-b-4 ${colors.borderPrimary} pb-2 mb-6`}
					>
						Loading States
					</h2>
					<div
						className={`p-6 ${colors.inputBackground} border-4 ${colors.borderPrimary} shadow-[6px_6px_0px_theme(colors.stone.800)] text-center`}
					>
						{isLoading ? (
							<Loader text="Fetching today's Danagram..." />
						) : (
							<p className="text-xl text-lime-700">Danagram Loaded!</p>
						)}
						<p className={`${colors.textSecondary} text-lg mt-4`}>
							(This is a demo. Loader shows for 5 seconds then switches to
							"Loaded" message.)
						</p>
						<Button
							variant="secondary"
							size="small"
							onClick={() => setIsLoading(true)}
						>
							Re-show Loader
						</Button>
					</div>
				</section>

				{/* Color Palette Section (Existing) */}
				<section>
					<h2
						className={`text-4xl sm:text-5xl ${colors.textPrimary} border-b-4 ${colors.borderPrimary} pb-2 mb-6`}
					>
						Color Palette
					</h2>
					{/* ... color palette display ... */}
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
						{[
							{
								name: "Background",
								class: colors.backgroundGradient,
								text: colors.textPrimary,
								isGradient: true,
							},
							{
								name: "Text Primary",
								class: colors.textPrimary,
								text: "text-white",
							},
							{
								name: "Text Secondary",
								class: colors.textSecondary.replace("text-", "bg-"),
								text: "text-white",
							},
							{
								name: "Border Primary",
								class: colors.borderPrimary.replace("border-", "bg-"),
								text: "text-white",
							},
							{
								name: "Accent Primary",
								class: colors.accentPrimary,
								text: "text-white",
							},
							{
								name: "Accent Secondary",
								class: colors.accentSecondary,
								text: "text-white",
							},
							{
								name: "Input Background",
								class: colors.inputBackground,
								text: colors.textPrimary,
							},
							{
								name: "Letter Tile BG",
								class: colors.letterTileBg,
								text: colors.textPrimary,
							},
							{
								name: "Loader Dot BG",
								class: colors.loaderDotBg,
								text: "text-white",
							},
							{
								name: "Shadow Color",
								class: colors.shadowColor.replace("shadow-", "bg-"),
								text: "text-white",
							},
						].map((color) => (
							<div
								key={color.name}
								className={`p-4 border-4 ${colors.borderPrimary} shadow-[4px_4px_0px_theme(colors.stone.800)] ${color.isGradient ? "" : colors.inputBackground}`}
							>
								<div
									className={`${color.class} h-20 w-full border-2 ${colors.borderPrimary} mb-2 flex items-center justify-center`}
								>
									<span
										className={`${color.text} text-lg p-1 bg-black/30 rounded`}
									>
										{color.class}
									</span>
								</div>
								<p className="text-center text-lg">{color.name}</p>
							</div>
						))}
					</div>
				</section>

				{/* Example Card/Block (Existing) */}
				<section>
					<h2
						className={`text-4xl sm:text-5xl ${colors.textPrimary} border-b-4 ${colors.borderPrimary} pb-2 mb-6`}
					>
						UI Block / Card
					</h2>
					{/* ... UI block example ... */}
					<div
						className={`p-6 ${colors.inputBackground} border-4 ${colors.borderPrimary} shadow-[6px_6px_0px_theme(colors.stone.800)]`}
					>
						<h3 className="text-3xl mb-3">Today's Stats</h3>
						<p className="text-xl mb-1">
							Guesses Left:{" "}
							<span
								className={`${colors.accentPrimary.replace("bg-", "text-")}`}
							>
								3
							</span>
						</p>
						<p className="text-xl">
							Current Score:{" "}
							<span
								className={`${colors.accentSecondary.replace("bg-", "text-")}`}
							>
								50
							</span>
						</p>
						<div className="mt-6">
							<Button variant="primary">View Leaderboard</Button>
						</div>
					</div>
				</section>
			</div>

			<footer
				className={`text-center ${colors.textSecondary} mt-16 pb-8 text-lg`}
			>
				<p>
					&copy; {new Date().getFullYear()} Danagrams. Made with love (and
					pixels!).
				</p>
			</footer>
		</div>
	);
}

export default RouteComponent;

// Minimal representation of Tailwind default colors for scrollbar styling
const tailwindColors = {
	teal: {
		// Used in gradient
		200: "#99f6e4",
	},
	sky: {
		// Used in gradient
		200: "#bae6fd",
	},
	slate: {
		// Used for input backgrounds and scrollbar with gradient
		50: "#f8fafc", // For letter tiles
		100: "#f1f5f9",
		200: "#e2e8f0",
		400: "#94a3b8", // For letter tile borders
	},
	lime: {
		600: "#65a30d",
		700: "#4d7c0f",
	},
	stone: {
		800: "#292524",
	},
};
