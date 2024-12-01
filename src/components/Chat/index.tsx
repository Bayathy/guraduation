"use client";

import { Message, useChat } from "ai/react";
import clsx from "clsx";
import { User } from "next-auth";
import { useCallback } from "react";
import Markdown from "react-markdown";
import { useSWRConfig } from "swr";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useScrollToBottom } from "@/hooks/use-scroll-bottom";

import { ChatCodeBlock } from "./chat-code-block";
import { ChatForm } from "./chat-form";
import { Overview } from "./overview";
import { RoleAvatar } from "./role-avatar";
import { ThinkingMessage } from "./thinking-message";

type Props = {
  chatId: string;

  initialMessages: Message[];
  user: User | null;
};

export const Chat = ({ chatId, initialMessages, user }: Props) => {
  const { mutate } = useSWRConfig();

  const [containerRef, endRef] = useScrollToBottom<HTMLDivElement>();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
  } = useChat({
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
    <div className="flex h-dvh max-w-full flex-col bg-background">
      <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex w-full items-center justify-between gap-2">
          <h1 className="">{user ? "Chat" : "Please sign in"}</h1>
          {/* <Button variant="outline" asChild>
            <Link href="/analytics">
              <ChartNoAxesColumn />
            </Link>
          </Button> */}
        </div>
      </header>
      {user ? (
        <>
          <div
            className="mx-auto flex size-full max-w-5xl flex-1 flex-col items-center gap-4 overflow-y-auto p-4"
            ref={containerRef}
          >
            {messages.map((message) => (
              <Card
                key={message.id}
                className={clsx(
                  "mx-auto w-full max-w-full",
                  message.role === "user" && "border-none shadow-none"
                )}
              >
                <CardHeader>
                  <RoleAvatar role={message.role} user={user} />
                </CardHeader>
                <CardContent>
                  <Markdown
                    className="prose max-w-full [&_pre]:m-0"
                    components={{
                      pre: ChatCodeBlock,
                    }}
                  >
                    {message.content}
                  </Markdown>
                </CardContent>
              </Card>
            ))}

            {isLoading &&
              messages.length > 0 &&
              messages[messages.length - 1].role === "user" && (
                <ThinkingMessage />
              )}
            <div ref={endRef} className="h-1" />
          </div>

          <div className="mx-auto w-full max-w-2xl bg-background px-4 pb-4">
            <ChatForm
              onSubmit={onSubmit}
              handleInputChange={handleInputChange}
              input={input}
              isLoading={isLoading}
              setInput={setInput}
            />
          </div>
        </>
      ) : (
        <div className="grid flex-1 place-items-center">
          <Overview />
        </div>
      )}
    </div>
  );
};
