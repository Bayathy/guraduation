import { openai } from "@ai-sdk/openai";
import { CoreMessage,CoreUserMessage, generateText } from "ai";

import { createTitlePrompt } from "./PROMPOT";

export async function generateTitleFromUserMessage({
	message,
}: {
	message: CoreUserMessage;
}) {
	const { text: title } = await generateText({
		model: openai("gpt-3.5-turbo"),
		system: createTitlePrompt,
		prompt: JSON.stringify(message),
	});

	return title;
}

export function getMostRecentUserMessage(messages: Array<CoreMessage>) {
	const userMessages = messages.filter((message) => message.role === "user");
	return userMessages.at(-1);
}