import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function ChatLayout({ children }: { children: React.ReactNode }) {
	const session = await auth();

	return (
		<SidebarProvider>
			<AppSidebar user={session?.user ?? null} />
			<SidebarInset className="flex h-dvh flex-col">{children}</SidebarInset>
		</SidebarProvider>
	);
}
