import { verifyPassword } from 'qwik-lucia';
import { lucia } from '~/lib/lucia';
import { prisma } from '~/lib/prisma';

export const login = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    //2. if user is not found, throw error
    if (!user) {
      return {
        message: 'Incorrect username or password',
        session: null,
      };
    }

    // 3. validate password
    const isValidPassword = await verifyPassword(user.passwordHash, password);

    if (!isValidPassword) {
      return {
        message: 'Incorrect username or password',
        session: null,
      };
    }

    // 4. create session
    const session = await lucia.createSession(user.id, {});

    return {
      message: 'Login successful',
      session,
    };
  } catch (error) {
    console.error('login error', error);
    return {
      message: 'An error occurred. Please try again',
      session: null,
    };
  }
};
