import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <>
      <h1 class="text-4xl font-black">Resumen</h1>
      <p class="my-10 text-2xl">Revisa tu pedido</p>
      {/* {orders.length === 0 ? (
        <p class="text-2xl text-center">No hay productos en el carrito</p>
      ) : (
        orders.map((order) => <ProductSummary order={order} key={order.id} />)
      )} */}
    </>
  );
});
