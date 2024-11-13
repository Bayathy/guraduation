// Allow streaming responses up to 30 seconds
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

import { deleteChat } from "@/db/chat";
import { createMessage } from "@/db/message";


export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, chatId } = await req.json();

  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    messages,
    system:
      "あなたはプログラミングの教師です。以下のトピックについて、学習者が理解していない可能性のある要点をリストアップしてください。また、それぞれの要点について簡潔な説明を加えてください。\n\nトピック: [ここにトピックを入力]\n\n1. 理解が不十分な可能性のある要点:\n   - 要点1: [説明]\n   - 要点2: [説明]\n   - 要点3: [説明]\n\nこの形式で、学習者がつまずきやすいポイントを明確にし、理解を深めるためのアドバイスを提供してください。",
    onFinish: async ({ response }) => {
      const res = await createMessage({
        chatId,
        role: "assistant",
        content: response.messages[0].content,
      });

      console.log(res);
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
