import { Message } from "ai";
import { User } from "next-auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const RoleAvatar = ({
	role,
	user,
}: {
	role: Message["role"];
	user: User;
}) => {
	return (
		<div className="flex items-center gap-2">
			<Avatar className="size-8">
				<AvatarImage src={role === "user" ? (user.image ?? undefined) : "/bot.svg"} />
				<AvatarFallback>{user.name?.[0] ?? "U"}</AvatarFallback>
			</Avatar>
			<p className="text-sm">{role === "user" ? user.name : "Assistant"}</p>
		</div>
	);
};
