import { component$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import type { Category as ICategory } from '@prisma/client';
import { Category } from '../quiosco/Category';

export interface SidebarProps {
  categories: ICategory[];
  username: string | null;
}

export const Sidebar = component$<SidebarProps>(({ categories, username }) => {
  const location = useLocation();
  return (
    <>
      <a href="/category/cafe/">
        <figure class="flex justify-center">
          <img width={150} height={50} src="/assets/img/logo.svg" alt="" />
        </figure>
      </a>
      <nav class="mt-10">
        <Link
          class={`
       ${location.url.pathname === `/${username}` && 'bg-amber-400'}
       flex items-center gap-4 w-full border p-5 hover:bg-amber-400 hover:cursor-pointer`}
          href={`/${username}`}
        >
          <h2 class="text-2xl font-bold ">Mi perfil</h2>
        </Link>
        {categories.map((category) => (
          <Category category={category} key={category.id} />
        ))}
      </nav>
    </>
  );
});
