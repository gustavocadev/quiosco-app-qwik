import { serverAuth$ } from '@builder.io/qwik-auth';
import Credentials from '@auth/core/providers/credentials';
import type { Provider } from '@auth/core/providers';
import { prisma } from '~/server/prisma';

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$(({ env }) => ({
    secret: env.get('AUTH_SECRET'),
    trustHost: true,
    providers: [
      Credentials({
        name: 'credentials',
        authorize: async (credentials) => {
          prisma.customer.findFirst({
            where: {},
          });
          console.log(credentials);
          console.log('authorize');
          return null;
        },
        credentials: {
          username: {
            label: 'Username',
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
