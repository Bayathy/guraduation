import { prisma } from "@/prisma";

export const getUserTestType = async (userId: string) => {
	const userTestType = await prisma.userTestType.findFirst({
		where: { userId },
	});
	return userTestType;
};
