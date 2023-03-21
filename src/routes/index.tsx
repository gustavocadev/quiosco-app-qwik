import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

export const useLoaderProducts = routeLoader$(({ redirect }) => {
  throw redirect(303, '/category/cafe');
});

export default component$(() => {
  return <></>;
});
