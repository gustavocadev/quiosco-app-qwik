import { component$ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>
      <h1 class="text-4xl font-black">Total y confirmar pedido</h1>
      <p class="my-10 text-2xl">Confirma tu pedido</p>
      <Form>
        <section>
          <label
            for="name"
            class="block text-xl font-bold uppercase text-slate-800"
          >
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            class="w-full p-2 mt-3 bg-gray-200 rounded-md lg:w-1/3"
            autoComplete="off"
          />
        </section>
        <section class="mt-10">
          <p class="text-3xl">
            Total a pagar: <span class="font-bold">{'PrecioPriduct'}</span>
          </p>
        </section>
        <section class="mt-5">
          <input type="hidden" name="total" />
          <input type="hidden" name="orders" />
          <button
            // class={`${
            //   !isValidOrder()
            //     ? 'bg-indigo-100'
            //     : 'bg-indigo-600 hover:bg-indigo-800'
            // } w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-gray-200 text-center`}
            type="submit"
            // disabled={!isValidOrder()}
          >
            Confirmar pedido
          </button>
        </section>
      </Form>
    </>
  );
});
