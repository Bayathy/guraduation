// Allow streaming responses up to 30 seconds
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { message } = await req.json();

  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    messages: [{ role: "user", content: message }],
  });

  return result.toDataStreamResponse();
}
