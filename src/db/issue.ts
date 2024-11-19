import { prisma } from "@/prisma";

export const createIssue = async ({
	chatId,
	userId,
	assistantMessageId,
	userMessageId,
	category,
	reason,
}: {
	chatId: string;
	userId: string;
	assistantMessageId: string;
	userMessageId: string;
	category: string[];
	reason: string;
}) => {
	await prisma.issue.create({
		data: {
			chatId,
			userId,
			category,
			reason,
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

export const getIssues = async (userId: string) => {
	const issues = await prisma.issue.findMany({
		where: { userId },
		include: {
			MessageIssue: {
				include: {
					Message: true,
				},
			},
		},
	});
	return issues;
};
