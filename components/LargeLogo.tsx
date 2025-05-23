import { cn } from "../utils/cn";

export function LargeLogo() {
	return (
		<div className="flex justify-center gap-1.5">
			{["D", "A", "N", "A", "G", "R", "A", "M", "S"].map((letter, index) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: No reordering, so this is fine
					key={index}
					className={cn(
						"flex h-12 w-12 items-center justify-center border-4 border-slate-400 bg-slate-50 text-3xl text-stone-800 shadow-[3px_3px_0px_theme(colors.stone.800)] sm:h-16 sm:w-16 sm:text-4xl",
						index % 2 === 0 ? "-rotate-[2deg]" : "rotate-[2deg]",
					)}
				>
					{letter}
				</div>
			))}
		</div>
	);
}
