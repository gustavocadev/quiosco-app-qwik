import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from "lucia";
import { prisma } from "./prisma";
import { qwikLuciaConfig } from "qwik-lucia";
import type { User } from "@prisma/client";

const prismaAdapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(prismaAdapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: import.meta.env.PROD,
		},
	},
	getUserAttributes: (userData) => ({
		email: userData.email,
	}),
});

export const { handleRequest } = qwikLuciaConfig(lucia);

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: Omit<User, "id">;
	}
}
