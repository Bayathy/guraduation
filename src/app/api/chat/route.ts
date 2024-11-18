// Allow streaming responses up to 30 seconds
import { openai } from "@ai-sdk/openai";
import {
	convertToCoreMessages,
	CoreMessage,
	CoreUserMessage,
	generateObject,
	generateText,
	Message,
	streamText,
} from "ai";

import { auth } from "@/auth";
import { IssueCategorySchema } from "@/components/Issue/types";
import { createChat, deleteChat, getChat } from "@/db/chat";
import { createIssue } from "@/db/issue";
import { createMessage, deleteMessages } from "@/db/message";

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
		onFinish: async ({ text }) => {
			const newAssistantMessage = await createMessage(chatId, "assistant", text);

			const { category } = await categorizeIssues({ message: userMessage });

			console.log(category);

			if (category && category !== "Other") {
				await createIssue({
					chatId,
					userId: session.user!.id!,
					assistantMessageId: newAssistantMessage.id,
					userMessageId: newUserMessage.id,
					category,
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

export async function categorizeIssues({ message }: { message: CoreUserMessage }) {
	const { object: issues } = await generateObject({
		model: openai("gpt-3.5-turbo"),
		system: `\n
    以下のメッセージをもとに、学習者が理解していない可能性のある要点をリストアップしてください。
    それぞれの要点について、以下のカテゴリのいずれかを選択してください。
    判断が難しい場合は、"Other"を選択してください。

    \n\n1. Syntax Error
    \n2. Logic Error
    \n3. Concept Misunderstanding
    \n4. Algorithm Design
    \n5. Error/Warning Interpretation
    \n6. Coding Style/Best Practice
    \n7. Other

    ラベル以外の文字列は使用しないでください。
    `,
		prompt: JSON.stringify(message),
		schema: IssueCategorySchema,
	});

	return issues;
}

export async function generateTitleFromUserMessage({
	message,
}: {
	message: CoreUserMessage;
}) {
	const { text: title } = await generateText({
		model: openai("gpt-3.5-turbo"),
		system: `\n
    - ユーザーが会話を始めた最初のメッセージに基づいて短いタイトルを生成します
    - 80文字以内に収めてください
    - タイトルはユーザーのメッセージの要約にしてください
    - 引用符やコロンは使用しないでください`,
		prompt: JSON.stringify(message),
	});

	return title;
}

export function getMostRecentUserMessage(messages: Array<CoreMessage>) {
	const userMessages = messages.filter((message) => message.role === "user");
	return userMessages.at(-1);
}
