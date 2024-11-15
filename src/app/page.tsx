import { auth } from "@/auth";
import { Chat } from "@/components/Chat";
import { generateUUID } from "@/lib/utils";

export default async function Home() {
  const id = generateUUID();
  const session = await auth();

  return <Chat chatId={id} initialMessages={[]} user={session?.user ?? null} />;
}
