"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
	answer1: z.string().min(1, { message: "必須項目です" }),
	answer2: z.string().min(1, { message: "必須項目です" }),
	answer3: z.string().min(1, { message: "必須項目です" }),
	answer4: z.string().min(1, { message: "必須項目です" }),
	answer5: z.string().min(1, { message: "必須項目です" }),
});

export const ExamForm = () => {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			answer1: "",
			answer2: "",
			answer3: "",
			answer4: "",
			answer5: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		const promiseRes = fetch("/api/exam", {
			method: "POST",
			body: JSON.stringify(data),
		}).then(() => {
			router.push("/");
		});

		toast.promise(promiseRes, {
			loading: "回答を送信しています",
			success: "回答を送信しました",
			error: "回答の送信に失敗しました",
		});

	};

	return (
		<div className="flex h-full flex-col">
			<div>
				<h2 className="text-xl font-bold">回答</h2>
				<p className="mt-2">
					以下の問題に回答してください。答える際は、書いたプログラムを見ず、その場で考えて回答してください。
					<br />
					わからない場合は、「わからない」と回答してください。
				</p>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 grid flex-1 grid-rows-5 gap-4">
					<FormField
						control={form.control}
						name="answer1"
						render={({ field }) => (
							<Card>
								<CardHeader>
									<CardTitle>48行目の空欄1に当てはまるプログラムを書いてください</CardTitle>
								</CardHeader>
								<CardContent>
									<Input placeholder="空欄1に当てはまるプログラムを書いてください" {...field} />
								</CardContent>
							</Card>
						)}
					/>
					<FormField
						control={form.control}
						name="answer2"
						render={({ field }) => (
							<Card>
								<CardHeader>
									<CardTitle>50行目の空欄2に当てはまるプログラムを書いてください</CardTitle>
								</CardHeader>
								<CardContent>
									<Input placeholder="空欄2に当てはまるプログラムを書いてください" {...field} />
								</CardContent>
							</Card>
						)}
					/>
					<FormField
						control={form.control}
						name="answer3"
						render={({ field }) => (
							<Card>
								<CardHeader>
									<CardTitle>62行目の空欄3に当てはまるプログラムを書いてください</CardTitle>
								</CardHeader>
								<CardContent>
									<Input placeholder="空欄3に当てはまるプログラムを書いてください" {...field} />
								</CardContent>
							</Card>
						)}
					/>
					<FormField
						control={form.control}
						name="answer4"
						render={({ field }) => (
							<Card>
								<CardHeader>
									<CardTitle>70行目の空欄4に当てはまるプログラムを書いてください</CardTitle>
								</CardHeader>
								<CardContent>
									<Input placeholder="空欄4に当てはまるプログラムを書いてください" {...field} />
								</CardContent>
							</Card>
						)}
					/>
					<FormField
						control={form.control}
						name="answer5"
						render={({ field }) => (
							<Card>
								<CardHeader>
									<CardTitle>74行目の空欄5に当てはまるプログラムを書いてください</CardTitle>
								</CardHeader>
								<CardContent>
									<Input placeholder="空欄5に当てはまるプログラムを書いてください" {...field} />
								</CardContent>
							</Card>
						)}
					/>
					<Button type="submit" disabled={!form.formState.isValid}>
						送信
					</Button>
				</form>
			</Form>
		</div>
	);
};
