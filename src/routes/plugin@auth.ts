import { serverAuth$ } from '@builder.io/qwik-auth';
import Credentials from '@auth/core/providers/credentials';
import type { Provider } from '@auth/core/providers';
import { prisma } from '~/server/prisma';
import bcryptjs from 'bcryptjs';

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$(({ env }) => ({
    secret: env.get('AUTH_SECRET'),
    trustHost: true,
    providers: [
      Credentials({
        name: 'credentials',
        authorize: async (credentials: any) => {
          const customer = await prisma.customer.findFirst({
            where: {
              email: credentials.email,
            },
          });
          if (!customer) {
            return null;
          }

          const isPasswordValid = await bcryptjs.compare(
            credentials.password,
            customer.password
          );

          if (!isPasswordValid) {
            return null;
          }
          return customer;
        },
        credentials: {
          username: {
            label: 'Email',
            type: 'text',
          },
          password: {
            label: 'Password',
            type: 'password',
          },
        },
      }),
    ] as Provider[],
  }));
