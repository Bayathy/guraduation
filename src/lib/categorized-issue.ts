import { openai } from "@ai-sdk/openai";
import { generateObject, Message } from "ai";

import { IssueCategorySchema } from "@/components/Issue/types";

import { createIssuePrompt } from "./PROMPOT";

export async function categorizeIssues({ messages }: { messages: Message[] }) {
	const { object: issues } = await generateObject({
		model: openai("gpt-3.5-turbo"),
		system: createIssuePrompt,
		messages,
		schema: IssueCategorySchema,
	});

	return issues;
}
