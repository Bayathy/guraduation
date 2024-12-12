import { auth } from "@/auth";
import { prisma } from "@/prisma";

export const POST = async (req: Request) => {
	const session = await auth();

	if (!session?.user) {
		return new Response(null, { status: 401 });
	}

	const { answer1, answer2, answer3, answer4, answer5 } = await req.json();
	await prisma.examAnswer.create({
		data: {
			userId: session.user.id!,
			answer1,
			answer2,
			answer3,
			answer4,
			answer5,
		},
	});

	return new Response(null, { status: 200 });
};
