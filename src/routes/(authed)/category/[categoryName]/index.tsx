import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { Product } from '~/components/quiosco/Product';
import { prisma } from '~/lib/prisma';

export const useLoaderProducts = routeLoader$(async ({ params }) => {
  const categoryName = params.categoryName;

  const categoryFound = await prisma.category.findFirst({
    where: {
      slug: categoryName,
    },
    include: {
      products: true,
    },
  });
  if (!categoryFound) {
    throw new Error('Category not found');
  }

  return categoryFound;
});

export default component$(() => {
  const categoryFound = useLoaderProducts();
  return (
    <>
      <h1 class="text-4xl font-black">{categoryFound.value.name} 🦄🦄🦄🦄</h1>
      <p class="my-10 text-2xl">
        Elige y personaliza tu pedido a continuación.
      </p>
      <section class="grid grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-4">
        {categoryFound.value.products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </section>
    </>
  );
});
