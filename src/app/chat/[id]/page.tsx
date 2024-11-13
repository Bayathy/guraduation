import { Message as DBMessage } from "@prisma/client";
import { Message } from "ai";

import { Chat } from "@/components/chat";

type Params = {
  id: string;
};

const convertUIMessage = (message: DBMessage[]): Message[] => {
  return message.map((message) => ({
    id: message.id,
    role: message.role as Message["role"],
    content: message.content,
    createdAt: message.createdAt,
  }));
};

export default async function ChatPage({ params }: { params: Params }) {
  
  // const messages = await getMessages(params.id);

  return <Chat chatId={params.id} initialMessages={[]} />;
}
