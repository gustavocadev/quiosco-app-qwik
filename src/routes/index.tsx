import type { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = ({ redirect }) => {
  throw redirect(303, '/category/cafe');
};
