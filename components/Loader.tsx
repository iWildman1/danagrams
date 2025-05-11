"use client";

interface LoaderProps {
	text?: string;
}

export function Loader({ text = "Loading..." }: LoaderProps) {
	return (
		<div className="text-center">
			{text && <h3 className="mb-4 text-2xl">{text}</h3>}
			<div className="my-6 flex items-center justify-center gap-2">
				<div className="h-5 w-5 animate-bounce border-2 border-stone-800 bg-lime-600 [animation-delay:-0.3s]" />
				<div className="h-5 w-5 animate-bounce border-2 border-stone-800 bg-lime-600 [animation-delay:-0.15s]" />
				<div className="h-5 w-5 animate-bounce border-2 border-stone-800 bg-lime-600" />
			</div>
		</div>
	);
}
