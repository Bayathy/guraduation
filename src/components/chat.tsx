"use client";

import { Message, useChat } from "ai/react";
import Markdown from "react-markdown";

import { ChatForm } from "./chat-form";
import { Card, CardContent, CardHeader } from "./ui/card";

type Props = {
  chatId: string;
  initialMessages: Message[];
};

export const Chat = ({ chatId, initialMessages }: Props) => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages,
      body: {
        chatId,
      },
      onFinish: () => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      },
    });

  return (
    <div className="flex size-full flex-col">
      <div className="flex flex-1 flex-col gap-4">
        {messages.map((message) => (
          <Card key={message.id}>
            <CardHeader>{message.role}</CardHeader>
            <CardContent>
              <Markdown className="prose">{message.content}</Markdown>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mx-auto w-full max-w-2xl bg-background px-4 pb-4">
        <ChatForm
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          input={input}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
