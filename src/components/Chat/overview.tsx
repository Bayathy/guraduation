import { User } from "next-auth";
import { signIn } from "next-auth/react";

import { Button } from "../ui/button";

type Props = {
	user: User | null;
};

export const Overview = ({ user }: Props) => {
	if (!user)
		return (
			<div className="flex flex-col items-center justify-center gap-2">
				<div>Please sign in to save and revisit previous chats!</div>
				<Button onClick={() => signIn()}>Login</Button>
			</div>
		);

	return <div>Overview</div>;
};
