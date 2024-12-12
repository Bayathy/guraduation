import "./globals.css";

import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
	title: "SNCT AI Assistant",
	description: "SNCT AI Assistant",
};

const notoSansJP = Noto_Sans_JP({
	subsets: ["latin"],
	weight: ["400", "700"],
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" className={notoSansJP.className}>
			<body>
				{children}
				<Toaster position="top-right" />
			</body>
		</html>
	);
}
