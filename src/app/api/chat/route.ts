// Allow streaming responses up to 30 seconds
import { openai } from "@ai-sdk/openai";
import {
	convertToCoreMessages,
	Message,
	streamText,
} from "ai";

import { auth } from "@/auth";
import { createChat, deleteChat, getChat } from "@/db/chat";
import { createIssue } from "@/db/issue";
import { createMessage, deleteMessages } from "@/db/message";
import { categorizeIssues } from "@/lib/categorized-issue";
import { generateTitleFromUserMessage,getMostRecentUserMessage } from "@/lib/generate-title-from-message";
import { basePrompt } from "@/lib/PROMPOT";

export const maxDuration = 30;

export async function POST(req: Request) {
	const session = await auth();

	if (!session?.user) {
		return new Response(null, { status: 401 });
	}

	const {
		messages,
		chatId,
	}: {
		messages: Message[];
		chatId: string;
	} = await req.json();

	const chat = await getChat(chatId);
	const coreMessages = convertToCoreMessages(messages);
	const userMessage = getMostRecentUserMessage(coreMessages);

	if (!userMessage) {
		return new Response("No user message found", { status: 400 });
	}

	if (!chat) {
		const title = await generateTitleFromUserMessage({ message: userMessage });
		await createChat(chatId, session.user.id!, title);
	}

	const newUserMessage = await createMessage(chatId, "user", userMessage.content as string);

	const result = await streamText({
		model: openai("gpt-3.5-turbo"),
		messages,
		system: basePrompt,
		onFinish: async ({ text }) => {
			const newAssistantMessage = await createMessage(chatId, "assistant", text);

			const response = await categorizeIssues({ messages });

			if (response && response.issues !== "Other") {
				await createIssue({
					chatId,
					userId: session.user!.id!,
					assistantMessageId: newAssistantMessage.id,
					userMessageId: newUserMessage.id,
					category: response.issues,
					reason: response.reason,
				});
			}
		},
	});

	return result.toDataStreamResponse();
}

export async function DELETE(req: Request) {
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");

	if (!id) {
		return new Response(null, { status: 400 });
	}

	await deleteMessages(id);
	await deleteChat(id);
	return new Response(null, { status: 204 });
}

