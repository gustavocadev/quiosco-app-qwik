import { component$ } from '@builder.io/qwik';
import { Form, routeAction$, z, zod$ } from '@builder.io/qwik-city';

export const useActionCreateCustomer = routeAction$(
  (values) => {
    console.log(values);
    return {};
  },
  zod$({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(5),
  })
);

export default component$(() => {
  const actionCreateCustomer = useActionCreateCustomer();
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

          <Form class="flex flex-col gap-2 p-2" action={actionCreateCustomer}>
            <label>
              <span>First name</span>
            </label>
            <input
              type="text"
              class="p-2 rounded border bg-gray-50 w-full"
              name="firstName"
            />

            <label for="">
              <span>Last name</span>
            </label>
            <input
              type="text"
              class="p-2 rounded border bg-gray-50"
              name="lastName"
            />

            <label for="">
              <span>Email</span>
            </label>
            <input
              type="email"
              class="p-2 rounded border bg-gray-50"
              name="email"
            />

            <label for="">
              <span>Password</span>
            </label>
            <input
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
