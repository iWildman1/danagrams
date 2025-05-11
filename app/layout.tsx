import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";

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
			</body>
		</html>
	);
}
