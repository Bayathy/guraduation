import { prisma } from "@/prisma";

export const createIssue = async ({
	chatId,
	userId,
	assistantMessageId,
	userMessageId,
	category,
}: {
	chatId: string;
	userId: string;
	assistantMessageId: string;
	userMessageId: string;
	category: string[];
}) => {
	await prisma.issue.create({
		data: {
			chatId,
			userId,
			category,
			MessageIssue: {
				createMany: {
					data: [
						{
							messageId: assistantMessageId,
						},
						{
							messageId: userMessageId,
						},
					],
				},
			},
		},
	});
};
