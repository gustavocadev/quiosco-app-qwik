import { component$, Slot } from '@builder.io/qwik';
import { Sidebar } from '~/components/ui/Sidebar';
import { routeLoader$ } from '@builder.io/qwik-city';
import { prisma } from '~/server/prisma';
import { Steps } from '~/components/ui/Steps';

export const useLoaderCategories = routeLoader$(() => {
  return prisma.category.findMany();
});

export default component$(() => {
  const categories = useLoaderCategories();

  return (
    <section class="md:flex">
      <aside class="h-screen overflow-y-scroll md:w-4/12 xl:w-1/4 2xl:w-1/5">
        <Sidebar categories={categories.value} />
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
