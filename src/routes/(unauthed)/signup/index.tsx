import { component$ } from '@builder.io/qwik';
import {
  Form,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from '@builder.io/qwik-city';
import { auth } from '~/lib/lucia';

export const useSignupLoader = routeLoader$(async (event) => {
  const authRequest = auth.handleRequest(event);
  const { user } = await authRequest.validateUser();

  // if user is already logged in, redirect to /category/cafe
  if (user) {
    throw event.redirect(303, '/category/cafe');
  }

  return {};
});

export const useSignupAction = routeAction$(
  async (values, event) => {
    const username = `${values.firstName}${Date.now()}`.toLowerCase();
    await auth.createUser({
      primaryKey: {
        // my credentials
        providerId: 'email',
        providerUserId: values.email,
        password: values.password,
      },
      // custom attributes
      attributes: {
        email: values.email,
        name: `${values.firstName}`,
        lastName: `${values.lastName}`,
        username: username,
        phone: '',
        address: '',
      },
    });

    throw event.redirect(303, '/');
  },
  zod$({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(5),
  })
);

export default component$(() => {
  const signupAction = useSignupAction();
  return (
    <div class="max-w-2xl mx-auto border mt-20 p-4">
      <section class="flex gap-8 items-center flex-wrap">
        <figure class="flex justify-center items-center flex-1">
          <img src="/assets/img/logo.svg" class="w-48" alt="" />
        </figure>

        <div class="flex-1">
          <header>
            <h1 class="font-bold text-3xl">Sign up</h1>
          </header>

          <Form action={signupAction} class="flex flex-col gap-2 p-2">
            <label for="firstName">
              <span>First name</span>
            </label>
            <input
              id="firstName"
              type="text"
              class="p-2 rounded border bg-gray-50 w-full"
              name="firstName"
            />

            <label for="lastName">
              <span>Last name</span>
            </label>
            <input
              id="lastName"
              type="text"
              class="p-2 rounded border bg-gray-50"
              name="lastName"
            />

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
              Crear cuenta
            </button>
          </Form>
        </div>
      </section>
    </div>
  );
});
