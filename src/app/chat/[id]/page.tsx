import { Message as DBMessage } from "@prisma/client";
import { Message } from "ai";

import { auth } from "@/auth";
import { Chat } from "@/components/Chat";
import { getMessages } from "@/db/message";

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

export default async function ChatPage(props: { params: Promise<Params> }) {
	const params = await props.params;
	const session = await auth();
	const messages = await getMessages(params.id);

	return (
		<Chat
			chatId={params.id}
			initialMessages={convertUIMessage(messages)}
			user={session?.user ?? null}
		/>
	);
}
