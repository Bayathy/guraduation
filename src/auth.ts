import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [GitHub],
	callbacks: {
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

			if (isLoggedIn) {
				return Response.redirect(new URL("/", nextUrl as unknown as URL));
			}

			return true;
		},
	},
});
