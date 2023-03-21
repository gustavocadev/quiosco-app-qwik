import { component$ } from '@builder.io/qwik';
import { useNavigate, useLocation } from '@builder.io/qwik-city';

const steps = [
  {
    step: 1,
    title: 'Elige tu producto',
    url: '/category/cafe/',
    name: 'Menú Inicial',
  },
  {
    step: 2,
    name: 'Resumen',
    url: '/summary/',
  },
  {
    step: 3,
    name: 'Datos y total del pedido',
    url: '/total/',
  },
];

export const Steps = component$(() => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <section class="flex justify-between mb-5 ">
        {steps.map(({ step, name, url }) => {
          return (
            <button
              key={step}
              onClick$={() => {
                navigate(url);
              }}
              class="text-2xl font-bold"
            >
              {name}
            </button>
          );
        })}
      </section>

      <section class="bg-gray-100 mb-100">
        <div
          class={{
            'w-12/12': location.url.pathname === '/total/',
            'w-6/12': location.url.pathname === '/summary/',
            'w-1/12': location.url.pathname === '/category/cafe/',
            'rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white':
              true,
          }}
        ></div>
      </section>
    </>
  );
});
