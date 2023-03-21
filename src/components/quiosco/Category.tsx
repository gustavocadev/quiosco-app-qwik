import { component$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import type { Category as ICategory } from '@prisma/client';

export interface CategoryProps {
  category: ICategory;
}

export const Category = component$<CategoryProps>(({ category }) => {
  const location = useLocation();

  return (
    <Link
      href={`/category/${category.slug}`}
      class={{
        'bg-amber-400': `/category/${category.slug}` === location.url.pathname,
        'flex items-center gap-4 w-full border p-5 hover:bg-amber-400 hover:cursor-pointer':
          true,
      }}
    >
      <figure>
        <img
          width={70}
          height={70}
          src={`/assets/img/icono_${category.icon}.svg`}
          alt="Imagen icono"
        />
      </figure>
      <h2 class="text-2xl font-bold ">{category.name}</h2>
    </Link>
  );
});
