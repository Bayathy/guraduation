import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

import { generateRandomTestType } from "./lib/random";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [GitHub],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		signIn: async ({ user }) => {
			if (!user.id) return false;
			const userTestType = await prisma.userTestType.findUnique({
				where: {
					id: user.id,
				},
			});

			if (!userTestType) {
				await prisma.userTestType.create({
				data: {
					userId: user.id,
					testType: generateRandomTestType(),
				},
				});
			}
			return true;
		},
		session: async ({ session, token }) => {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			return session;
		},
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnChat = nextUrl.pathname.startsWith("/chat");

			if (isLoggedIn && isOnChat) {
				return Response.redirect(new URL("/", nextUrl as unknown as URL));
			}

			if (isOnChat) {
				if (isLoggedIn) return true;
				return false; // Redirect unauthenticated users to login page
			}

			if (!isLoggedIn) {
				return Response.redirect(new URL("/", nextUrl as unknown as URL));
			}

			return true;
		},
	},
});
