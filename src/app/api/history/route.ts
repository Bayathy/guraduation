import { auth } from "@/auth";
import { createChat, getChats } from "@/db/chat";

export async function GET() {
  const session = await auth();

  if (!session || !session.user) {
    return Response.json("Unauthorized!", { status: 401 });
  }

  const chats = await getChats(session.user.id!);


  return Response.json(chats);
}

export async function POST() {
  const session = await auth();

  if (!session || !session.user) {
    return Response.json("Unauthorized!", { status: 401 });
  }

  const chat = await createChat(session.user.id!);

  return Response.json(chat);
}
