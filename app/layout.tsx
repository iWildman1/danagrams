import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import { Toaster } from "sonner";
import { TRPCReactProvider } from "@/trpc/client";

import "./globals.css";

const vt323 = VT323({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-vt323",
});

export const metadata: Metadata = {
	title: "Danagrams",
	description: "A daily anagram puzzle game",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${vt323.variable} min-h-screen bg-gradient-to-br from-teal-200 to-sky-200 font-primary antialiased selection:bg-lime-300 selection:text-lime-900`}
			>
				<TRPCReactProvider>{children}</TRPCReactProvider>
				<Toaster
					theme="light"
					className="font-primary"
					toastOptions={{
						style: {
							background: "#f1f5f9",
							border: "4px solid #292524",
							boxShadow: "4px 4px 0px #292524",
							fontFamily: "var(--font-vt323)",
							fontSize: "1.25rem",
						},
					}}
				/>
			</body>
		</html>
	);
}
