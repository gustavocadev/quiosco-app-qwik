import { component$, Slot } from '@builder.io/qwik';
import { Sidebar } from '~/components/ui/Sidebar';
import { routeLoader$ } from '@builder.io/qwik-city';
import { prisma } from '~/lib/prisma';
import { Steps } from '~/components/ui/Steps';
import { auth } from '~/lib/lucia';

export const useLoaderCategories = routeLoader$(async () => {
  return prisma.category.findMany();
});

export const useLoaderUser = routeLoader$(async (event) => {
  const authRequest = auth.handleRequest(event);
  const { user } = await authRequest.validateUser();
  // if user is already logged in, redirect to login page
  if (!user) {
    throw event.redirect(303, '/');
  }

  const userDB = await prisma.authUser.findUnique({
    where: {
      id: user.userId,
    },
  });

  if (!userDB) {
    throw event.redirect(303, '/');
  }

  return {
    username: userDB.username,
  };
});

export default component$(() => {
  const categories = useLoaderCategories();
  const user = useLoaderUser();
  return (
    <section class="md:flex">
      <aside class="h-screen overflow-y-scroll md:w-4/12 xl:w-1/4 2xl:w-1/5">
        <Sidebar categories={categories.value} username={user.value.username} />
      </aside>
      <main class="h-screen overflow-y-scroll md:w-8/12 xl:w-3/4 2xl:w-4/5">
        <section class="p-10">
          <Steps />
          <div class="mt-4">
            <Slot />
          </div>
        </section>
      </main>
    </section>
  );
});
