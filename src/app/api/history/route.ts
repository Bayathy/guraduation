import { auth } from "@/auth";
import { getChats } from "@/db/chat";

export async function GET() {
  const session = await auth();

  if (!session || !session.user) {
    return Response.json("Unauthorized!", { status: 401 });
  }

  const chats = await getChats(session.user.id!);


  return Response.json(chats);
}
