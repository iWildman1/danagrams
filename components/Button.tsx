import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
	"inline-flex items-center justify-center text-xl sm:text-2xl border-4 border-stone-800 transition-all duration-75 ease-out disabled:bg-stone-300 disabled:text-stone-500 disabled:border-stone-400 disabled:shadow-[4px_4px_0px_theme(colors.stone.400)] disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_theme(colors.stone.400)] disabled:active:translate-x-0 disabled:active:translate-y-0 disabled:active:shadow-[4px_4px_0px_theme(colors.stone.400)]",
	{
		variants: {
			variant: {
				primary:
					"bg-lime-600 hover:bg-lime-700 text-white shadow-[4px_4px_0px_theme(colors.stone.800)] hover:shadow-[2px_2px_0px_theme(colors.stone.800)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[1px_1px_0px_theme(colors.stone.800)] active:translate-x-[3px] active:translate-y-[3px] disabled:hover:bg-stone-300",
				secondary:
					"bg-rose-500 hover:bg-rose-600 text-white shadow-[4px_4px_0px_theme(colors.stone.800)] hover:shadow-[2px_2px_0px_theme(colors.stone.800)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[1px_1px_0px_theme(colors.stone.800)] active:translate-x-[3px] active:translate-y-[3px]",
				subtle:
					"bg-transparent hover:bg-slate-200 text-stone-800 hover:text-lime-700 active:translate-y-[2px] active:translate-x-[2px]",
				small:
					"text-lg border-2 shadow-[2px_2px_0px_theme(colors.stone.800)] hover:shadow-[1px_1px_0px_theme(colors.stone.800)] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]",
				inverted:
					"bg-white text-stone-800 border-stone-800 shadow-[4px_4px_0px_theme(colors.stone.800)] hover:bg-stone-100 hover:text-lime-700 hover:shadow-[2px_2px_0px_theme(colors.stone.800)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[1px_1px_0px_theme(colors.stone.800)] active:translate-x-[3px] active:translate-y-[3px]",
			},
			size: {
				default: "py-3 px-6 w-full sm:w-auto",
				small: "py-2 px-4",
				full: "py-3 px-6 w-full",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
