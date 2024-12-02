"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Props = {
	onSubmit: () => void;
	handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	input: string;
	isLoading: boolean;
	setInput: (input: string) => void;
};

export const ChatForm = ({ onSubmit, handleInputChange, input, isLoading }: Props) => {
	return (
		<div className="flex w-full max-w-2xl items-center gap-2 rounded-lg bg-sidebar p-4">
			<Textarea
				placeholder="メッセージを入力"
				onChange={handleInputChange}
				value={input}
				onKeyDown={(event) => {
					if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
						event.preventDefault();

						if (isLoading) {
							toast.error("Please wait for the model to finish its response!");
						} else {
							onSubmit();
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
				onClick={(e) => {
					e.preventDefault();
					onSubmit();
				}}
			>
				{isLoading ? "送信中..." : "送信"}
			</Button>
		</div>
	);
};
