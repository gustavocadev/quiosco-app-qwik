import { component$ } from '@builder.io/qwik';
import {
  Form,
  Link,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from '@builder.io/qwik-city';
import { auth } from '~/lib/lucia';

export const useLoginLoader = routeLoader$(async (event) => {
  const authRequest = auth.handleRequest(event);
  const { user } = await authRequest.validateUser();

  // if user is already logged in, redirect to /category/cafe
  if (user) {
    throw event.redirect(303, '/category/cafe');
  }

  return {};
});

export const useLoginAction = routeAction$(
  async (values, event) => {
    const authRequest = auth.handleRequest(event);

    const key = await auth.useKey('email', values.email, values.password);
    const session = await auth.createSession(key.userId);

    authRequest.setSession(session);

    throw event.redirect(303, '/category/cafe');
  },
  zod$({
    email: z.string().email(),
    password: z.string().min(5),
  })
);

export default component$(() => {
  const loginAction = useLoginAction();
  return (
    <div class="max-w-2xl mx-auto border mt-20 p-4">
      <section class="flex gap-8 items-center flex-wrap">
        <figure class="flex justify-center items-center flex-1">
          <img src="/assets/img/logo.svg" class="w-48" alt="" />
        </figure>

        <div class="flex-1">
          <header>
            <h1 class="font-bold text-3xl">Login</h1>
          </header>

          <Form class="flex flex-col gap-2 p-2" action={loginAction}>
            <label for="email">
              <span>Email</span>
            </label>
            <input
              id="email"
              type="email"
              class="p-2 rounded border bg-gray-50"
              name="email"
            />

            <label for="password">
              <span>Password</span>
            </label>
            <input
              id="password"
              type="password"
              class="p-2 rounded border bg-gray-50"
              name="password"
            />

            <button
              type="submit"
              class="bg-indigo-500 rounded w-full text-white px-4 py-2 transition-colors hover:bg-indigo-600"
            >
              Login
            </button>
          </Form>

          <footer class="mt-4">
            <p>
              Don't have an account?{' '}
              <Link href="/signup" class="text-indigo-500">
                Sign up
              </Link>
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
});
