import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { auth } from "@/auth";
import { IssueCharts } from "@/components/Issue/issue-chart";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getIssues } from "@/db/issue";

export default async function Analytics() {
	const session = await auth();
	const issues = await getIssues(session!.user!.id!);

	return (
		<div className="flex h-dvh flex-col bg-background">
			<header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
				<SidebarTrigger className="-ml-1" />
				<h1>Analytics</h1>
			</header>
			<div className="flex w-full flex-1 flex-col p-4">
				<Button aria-label="Back to chat" variant="outline" className="w-fit" asChild>
					<Link href="/">
						<ArrowLeft />
						Back to chat
					</Link>
				</Button>
				<div className="mt-4 flex max-w-3xl flex-col gap-4">
					<h2 className="text-lg font-semibold">Issues Graph</h2>
					<IssueCharts issues={issues} />
				</div>
			</div>
		</div>
	);
}
