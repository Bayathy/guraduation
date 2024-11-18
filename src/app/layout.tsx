import "./globals.css";

import type { Metadata } from "next";

import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
	title: "ChatGPT Teacher",
	description: "ChatGPT Teacher",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	return (
		<html lang="ja">
			<body>
				<SidebarProvider>
					<AppSidebar user={session?.user ?? null} />
					<SidebarInset className="flex h-dvh flex-col">{children}</SidebarInset>
				</SidebarProvider>
				<Toaster position="top-right" />
			</body>
		</html>
	);
}
