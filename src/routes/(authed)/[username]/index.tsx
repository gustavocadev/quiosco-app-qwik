import { component$ } from '@builder.io/qwik';
import {
  Form,
  routeAction$,
  routeLoader$,
  useLocation,
} from '@builder.io/qwik-city';
import { handleRequest } from '~/lib/lucia';
import { prisma } from '~/lib/prisma';

export const useuserLoader = routeLoader$(async (event) => {
  const authRequest = handleRequest(event);
  const { user } = await authRequest.validateUser();
  // if user is already logged in, redirect to login page
  if (!user) {
    throw event.redirect(303, '/');
  }

  const userDB = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!userDB) {
    throw event.redirect(303, '/');
  }

  return { userDB };
});

export const useSignoutAction = routeAction$(async (_, event) => {
  const authRequest = handleRequest(event);
  const { session } = await authRequest.validateUser();

  if (!session) throw event.redirect(303, '/');

  await authRequest.invalidateSessionCookie(session);

  throw event.redirect(303, '/');
});

export default component$(() => {
  const userLoader = useuserLoader();
  const loc = useLocation();
  const signoutAction = useSignoutAction();

  return (
    <div class="max-w-2xl mx-auto border mt-20 p-4">
      <section class="flex gap-8 items-center flex-wrap">
        <div class="flex-1">
          <header class="flex justify-between">
            <h1 class="font-bold text-3xl">Informacion general</h1>
            <Form action={signoutAction}>
              <button
                class="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                type="submit"
              >
                Cerrar session
              </button>
            </Form>
          </header>

          <Form class="flex flex-col gap-2 p-2">
            <input type="hidden" name="_action" value="update" />
            <label for="username">
              <span>username</span>
            </label>
            <input
              id="username"
              type="text"
              class="p-2 rounded border bg-gray-50 w-full"
              name="username"
              value={loc.params.username}
            />

            <h3 class="font-bold text-xl">Informacion personal</h3>
            <label for="firstName">
              <span>Nombres</span>
            </label>
            <input
              id="firstName"
              type="text"
              class="p-2 rounded border bg-gray-50 w-full"
              name="names"
              value={userLoader.value.userDB?.name}
            />

            <label for="lastNames">
              <span>Apellidos</span>
            </label>
            <input
              id="lastNames"
              type="text"
              class="p-2 rounded border bg-gray-50"
              name="lastNames"
              value={userLoader.value.userDB?.lastName}
            />

            <label for="email">
              <span>Email</span>
            </label>
            <input
              id="email"
              type="email"
              class="p-2 rounded border bg-gray-50"
              name="email"
              value={userLoader.value.userDB?.email}
            />

            <label for="address">
              <span>Direccion</span>
            </label>
            <input
              id="address"
              type="text"
              class="p-2 rounded border bg-gray-50"
              name="address"
              placeholder='Ej: "Nuevo Ilo, Mz. 2 Lt. 3"'
              value={userLoader.value.userDB?.address ?? ''}
            />

            <label for="phone">
              <span>Telefono</span>
            </label>
            <input
              id="phone"
              type="text"
              class="p-2 rounded border bg-gray-50"
              name="phone"
              placeholder='Ej: "92106003"'
              value={userLoader.value.userDB?.phone ?? ''}
            />

            <h3 class="font-bold text-xl">Cambiar contraseña</h3>

            <label for="password">
              <span>Password</span>
            </label>
            <input
              id="password"
              type="password"
              class="p-2 rounded border bg-gray-50"
              name="password"
              placeholder="Escribe tu nueva contraseña"
            />

            <button
              type="submit"
              class="bg-indigo-500 rounded w-full text-white px-4 py-2 transition-colors hover:bg-indigo-600"
            >
              Guardar cambios
            </button>
          </Form>
        </div>
      </section>
    </div>
  );
});
