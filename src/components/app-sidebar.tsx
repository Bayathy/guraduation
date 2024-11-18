"use client";

import { Chat } from "@prisma/client";
import { ChevronsUpDown, LogOut, Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { User } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import useSWR from "swr";

import { fetcher } from "@/lib/utils";

import { ChatList } from "./Chat/chat-list";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

export const AppSidebar = ({ user }: { user: User | null }) => {
  const {
    data: history,
    isLoading,
    mutate,
  } = useSWR<Array<Chat>>(user ? "/api/history" : null, fetcher, {
    fallbackData: [],
  });

  return (
    <Sidebar>
      <SidebarHeader className="mt-2 w-full ">
        {user ? (
          <SidebarMenu>
            <SidebarMenuItem className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  redirect(`/`);
                }}
              >
                <Plus /> New Chat
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : null}
      </SidebarHeader>
      <SidebarContent>
        <ChatList
          user={user}
          history={history ?? []}
          isLoading={isLoading}
          mutate={mutate}
        />
      </SidebarContent>
      <SidebarFooter>
        {user ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="size-8 rounded-lg">
                      <AvatarImage
                        src={user?.image || undefined}
                        alt={user?.name || "Guest"}
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user?.name || "Guest"}
                      </span>
                      <span className="truncate text-xs">
                        {user?.email || "Guest"}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuItem>
                    <Button
                      type="submit"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        signOut({ redirectTo: "/" });
                      }}
                    >
                      <LogOut />
                      Log out
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <Button
            type="submit"
            className="w-full"
            onClick={() => {
              signIn();
            }}
          >
            Log in
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};
