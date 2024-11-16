// Allow streaming responses up to 30 seconds
import { openai } from "@ai-sdk/openai";
import {
	convertToCoreMessages,
	CoreMessage,
	CoreUserMessage,
	generateText,
	Message,
	streamText,
} from "ai";
import { z } from "zod";

import { auth } from "@/auth";
import { createChat, deleteChat, getChat } from "@/db/chat";
import { createMessage } from "@/db/message";

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

	await createMessage(chatId, "user", messages[0].content);

	const result = await streamText({
		model: openai("gpt-3.5-turbo"),
		messages,
		system: `\n 
    あなたはプログラミングの教師です。
    以下のトピックについて、学習者が理解していない可能性のある要点をリストアップしてください。また、それぞれの要点について簡潔な説明を加えてください。
    \n\nトピック: [ここにトピックを入力]
    \n\n1. 理解が不十分な可能性のある要点:
    \n   - 要点1: [説明]
    \n   - 要点2: [説明]
    \n   - 要点3: [説明]
    \n\nこの形式で、学習者がつまずきやすいポイントを明確にし、理解を深めるためのアドバイスを提供してください。
    \n\nもし、トピックがない場合は、答えなくても構いません。絶対に日本語で答えてください。
    `,
		tools: {
			categorizeIssues: {
				type: "function",
				description: "Categorize the issues",
				parameters: z.object({
					issues: z.union([
						z.literal("SyntaxError"),
						z.literal("LogicError"),
						z.literal("Concept Misunderstanding"),
						z.literal("Algorithm Design"),
						z.literal("Error/Warning Interpretation"),
						z.literal("Coding Style/Best Practice"),
					]),
				}),
			},
		},
		onFinish: async ({ text }) => {
			await createMessage(chatId, "assistant", text);
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

	await deleteChat(id);
	return new Response(null, { status: 204 });
}

export async function generateTitleFromUserMessage({
	message,
}: {
	message: CoreUserMessage;
}) {
	const { text: title } = await generateText({
		model: openai("gpt-3.5-turbo"),
		system: `\n
    - you will generate a short title based on the first message a user begins a conversation with
    - ensure it is not more than 80 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`,
		prompt: JSON.stringify(message),
	});

	return title;
}

export function getMostRecentUserMessage(messages: Array<CoreMessage>) {
	const userMessages = messages.filter((message) => message.role === "user");
	return userMessages.at(-1);
}
