"use client";

import { Message, useChat } from "ai/react";
import { User } from "next-auth";
import { useCallback } from "react";
import { useSWRConfig } from "swr";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useScrollToBottom } from "@/hooks/use-scroll-bottom";

import { ChatForm } from "./chat-form";
import { MessageList } from "./message-list";
import { Overview } from "./overview";
import { SubmitRedirectDialog } from "./submit-redirect-dialog";

type Props = {
	chatId: string;

	initialMessages: Message[];
	user: User | null;
};

export const Chat = ({ chatId, initialMessages, user }: Props) => {
	const { mutate } = useSWRConfig();

	const [containerRef, endRef] = useScrollToBottom<HTMLDivElement>();

	const { messages, handleInputChange, handleSubmit, setInput, isLoading, input, stop } = useChat({
		initialMessages,
		body: {
			chatId,
		},
		onFinish: () => {
			mutate("/api/history");

			window.scrollTo({
				top: document.body.scrollHeight,
				behavior: "smooth",
			});
		},
	});

	const onSubmit = useCallback(() => {
		window.history.replaceState({}, "", `/chat/${chatId}`);
		handleSubmit();
		setInput("");
	}, [chatId, handleSubmit, setInput]);

	return (
		<div className="flex h-dvh flex-col bg-background">
			<header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
				<SidebarTrigger className="-ml-1" />
				<div className="flex w-full items-center justify-between gap-2">
					<h1 className="">{user ? "Chat" : "Please sign in"}</h1>
					{user && <SubmitRedirectDialog />}
				</div>
			</header>
			{user ? (
				<>
					{messages.length === 0 && (
						<div className="grid h-full place-items-center">
							<p>下のテキストボックスにメッセージを入力してください。</p>
						</div>
					)}
					<div className="h-fit w-full flex-1 overflow-auto p-4" ref={containerRef}>
						<div className="mx-auto grid max-w-5xl gap-4">
							<MessageList messages={messages} isLoading={isLoading} user={user} />
						</div>
					</div>
					<div ref={endRef} className="h-4" />

					<div className="bottom-0 mx-auto w-full max-w-2xl bg-transparent px-4 pb-4">
						<ChatForm
							onSubmit={onSubmit}
							isLoading={isLoading}
							input={input}
							handleInputChange={handleInputChange}
							stop={stop}
						/>
					</div>
				</>
			) : (
				<div className="grid flex-1 place-items-center">
					<Overview user={user} />
				</div>
			)}
		</div>
	);
};
