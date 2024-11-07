"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";

const chatFormSchema = z.object({
  message: z.string(),
});

type ChatFormSchema = z.infer<typeof chatFormSchema>;

export const ChatForm = () => {
  const form = useForm<ChatFormSchema>({
    resolver: zodResolver(chatFormSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (data: ChatFormSchema) => {
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const res = await response.json();
    console.log(res);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-2xl items-center gap-2 rounded-lg bg-sidebar p-4"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Textarea
                  placeholder="メッセージを入力"
                  {...field}
                  rows={4}
                  className="resize-none border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="h-fit"
          variant="outline"
          disabled={!form.formState.isValid || !form.formState.isDirty}
        >
          {form.formState.isSubmitting ? "送信中..." : "送信"}
        </Button>
      </form>
    </Form>
  );
};
