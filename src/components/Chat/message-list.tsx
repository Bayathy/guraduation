import { Message } from "ai";
import clsx from "clsx";
import { User } from "next-auth";
import { memo } from "react";
import Markdown from "react-markdown";

import { Card, CardContent, CardHeader } from "../ui/card";
import { ChatCodeBlock } from "./chat-code-block";
import { RoleAvatar } from "./role-avatar";
import { ThinkingMessage } from "./thinking-message";

type Props = {
  messages: Message[];
  isLoading: boolean;
  user: User;
};

export const MessageList = memo(({ messages, isLoading, user }: Props) => {
  return (
    <>
      {messages.map((message) => (
        <Card
          key={message.id}
          className={clsx(
            "mx-auto w-full max-w-5xl",
            message.role === "user" && "border-none shadow-none"
          )}
        >
          <CardHeader>
            <RoleAvatar role={message.role} user={user} />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Markdown className="prose max-w-full [&_pre]:m-0">
                {message.content}
              </Markdown>
            ) : (
              <Markdown
                className="prose max-w-full [&_pre]:m-0"
                components={{
                  pre: ChatCodeBlock,
                }}
              >
                {message.content}
              </Markdown>
            )}
          </CardContent>
        </Card>
      ))}
      {isLoading &&
        messages.length > 0 &&
        messages[messages.length - 1].role === "user" && <ThinkingMessage />}
    </>
  );
});
