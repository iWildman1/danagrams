import * as React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"w-full bg-slate-100 text-stone-800 text-xl placeholder-stone-500 sm:text-2xl",
					"border-4 border-stone-800 p-3",
					"focus:border-lime-700 focus:outline-none focus:ring-4 focus:ring-lime-600/50",
					"shadow-[4px_4px_0px_theme(colors.stone.800)]",
					"focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_theme(colors.lime.700)]",
					"transition-all duration-100 ease-out",
					"disabled:cursor-not-allowed disabled:border-stone-400 disabled:bg-stone-300 disabled:text-stone-500 disabled:placeholder-stone-400 disabled:shadow-[4px_4px_0px_theme(colors.stone.400)]",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
