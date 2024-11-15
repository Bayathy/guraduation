import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Analytics() {
  return (
    <div className="flex h-dvh flex-col bg-background">
      <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
        <SidebarTrigger className="-ml-1" />
        <h1>Analytics</h1>
      </header>
      <div className="flex w-full flex-1 flex-col p-4">
        <Button
          aria-label="Back to chat"
          variant="outline"
          className="w-fit"
          asChild
        >
          <Link href="/">
            <ArrowLeft />
            Back to chat
          </Link>
        </Button>
      </div>
    </div>
  );
}
