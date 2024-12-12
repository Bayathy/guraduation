"use client";

import { useRouter } from "next/navigation";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

export const SubmitRedirectDialog = () => {
	const router = useRouter();

	const submit = () => {
		router.push("/form");
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline">課題終了後に押してください。</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>課題は終了しましたか？</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>いいえ</AlertDialogCancel>
					<AlertDialogAction onClick={submit}>はい</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
