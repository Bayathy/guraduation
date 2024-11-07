import { ChatForm } from "@/components/chat-form";

export default function Home() {
  return (
    <div className="h-full">
      <div className="fixed bottom-0 flex h-fit w-full justify-center p-4">
        <ChatForm />
      </div>
    </div>
  );
}
