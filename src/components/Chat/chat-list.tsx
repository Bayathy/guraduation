"use client";

import { Chat } from "@prisma/client";
import clsx from "clsx";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { User } from "next-auth";
import { toast } from "sonner";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
} from "../ui/sidebar";

export const ChatList = ({
	user,
	history,
	isLoading,
	mutate,
}: {
	user: User | null;
	history: Chat[];
	isLoading: boolean;
	mutate: () => void;
}) => {
	const { id } = useParams();

	const handleDelete = async (chatId: string) => {
		const deletePromise = fetch(`/api/chat?id=${chatId}`, {
			method: "DELETE",
		});

		toast.promise(deletePromise, {
			loading: "Deleting chat...",
			success: "Chat deleted",
			error: "Failed to delete chat",
		});

		mutate();

		if (id === chatId) {
			redirect("/");
		}
	};

	if (!user)
		return (
			<SidebarGroup>
				<SidebarGroupLabel>
					<h2 className="text-sm font-semibold">Chats</h2>
				</SidebarGroupLabel>
				<SidebarGroupContent>
					<div className="flex w-full flex-row items-center justify-center gap-2 text-sm text-zinc-500">
						<div>Login to save and revisit previous chats!</div>
					</div>
				</SidebarGroupContent>
			</SidebarGroup>
		);

	if (isLoading) {
		return (
			<SidebarGroup>
				<SidebarGroupContent>
					<SidebarGroupLabel>
						<h2 className="text-sm font-semibold">Chats</h2>
					</SidebarGroupLabel>
					<div className="flex flex-col">
						{[44, 32, 28, 64, 52].map((item) => (
							<div
								key={item}
								className="flex h-8 items-center gap-2 rounded-md px-2"
							>
								<div
									className="h-4 max-w-[--skeleton-width] flex-1 rounded-md bg-sidebar-accent-foreground/10"
									style={
										{
											"--skeleton-width": `${item}%`,
										} as React.CSSProperties
									}
								/>
							</div>
						))}
					</div>
				</SidebarGroupContent>
			</SidebarGroup>
		);
	}

	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarGroupLabel>
					<h2 className="text-sm font-semibold">Chats</h2>
				</SidebarGroupLabel>
				{history?.length === 0 ? (
					<div className="flex w-full flex-row items-center justify-center gap-2 text-sm text-zinc-500">
						<div>
							Your conversations will appear here once you start chatting!
						</div>
					</div>
				) : (
					history?.map((chat) => (
						<SidebarMenuItem
							key={chat.id}
							className={clsx(
								"flex list-none items-center justify-between rounded-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
								id === chat.id &&
									"bg-sidebar-accent text-sidebar-accent-foreground",
							)}
						>
							<SidebarMenuButton asChild>
								<Link href={`/chat/${chat.id}`} prefetch={false}>
									<span>{chat.name}</span>
								</Link>
							</SidebarMenuButton>
							<DropdownMenu modal={true}>
								<DropdownMenuTrigger asChild>
									<SidebarMenuAction className="mr-0.5 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
										<MoreHorizontalIcon />
										<span className="sr-only">More</span>
									</SidebarMenuAction>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem onClick={() => handleDelete(chat.id)}>
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</SidebarMenuItem>
					))
				)}
			</SidebarGroupContent>
		</SidebarGroup>
	);
};
