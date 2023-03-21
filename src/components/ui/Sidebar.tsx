import { component$ } from '@builder.io/qwik';
import type { Category as ICategory } from '@prisma/client';
import { Category } from '../quiosco/Category';

export interface SidebarProps {
  categories: ICategory[];
}

export const Sidebar = component$<SidebarProps>(({ categories }) => {
  return (
    <>
      <figure class="flex justify-center">
        <img width={150} height={50} src="/assets/img/logo.svg" alt="" />
      </figure>
      <nav class="mt-10">
        {categories.map((category) => (
          <Category category={category} key={category.id} />
        ))}
      </nav>
    </>
  );
});
