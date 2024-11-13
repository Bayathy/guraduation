"use client";

import { toast } from "sonner";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

type Props = {
  handleSubmit: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  input: string;
  isLoading: boolean;
};

export const ChatForm = ({
  handleSubmit,
  handleInputChange,
  input,
  isLoading,
}: Props) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-2xl items-center gap-2 rounded-lg bg-sidebar p-4"
    >
      <Textarea
        placeholder="メッセージを入力"
        onChange={handleInputChange}
        value={input}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();

            if (isLoading) {
              toast.error("Please wait for the model to finish its response!");
            } else {
              handleSubmit();
            }
          }
        }}
        rows={4}
        className="resize-none border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <Button
        type="submit"
        className="h-fit"
        variant="outline"
        disabled={isLoading}
      >
        {isLoading ? "送信中..." : "送信"}
      </Button>
    </form>
  );
};
