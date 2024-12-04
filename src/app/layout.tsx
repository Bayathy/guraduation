import "./globals.css";

import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";

import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
  const session = await auth();

  return (
    <html lang="ja" className={notoSansJP.className}>
      <body>
        <SidebarProvider>
          <AppSidebar user={session?.user ?? null} />
          <SidebarInset className="flex h-dvh flex-col">
            {children}
          </SidebarInset>
        </SidebarProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
