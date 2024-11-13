import { auth } from "@/auth";
import { createMessage } from "@/db/message";

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return Response.json("Unauthorized!", { status: 401 });
  }

  const body = await request.json();

  const message = await createMessage(body.chatId, body.role, body.content);

  return Response.json(message);
}
