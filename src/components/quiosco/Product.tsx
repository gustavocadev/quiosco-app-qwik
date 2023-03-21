import { component$ } from '@builder.io/qwik';
import type { Product as IProduct } from '@prisma/client';

export interface ProductProps {
  product: IProduct;
}

export const Product = component$<ProductProps>(({ product }) => {
  return (
    <section class="p-3 border">
      <figure>
        <img
          src={`/assets/img/${product.image}.jpg`}
          alt={`Imagen Platillo ${product.name}`}
          width={400}
          height={500}
        />
        <figcaption class="p-5">
          <h3 class="text-2xl font-bold">{product.name}</h3>
          <p class="mt-5 text-4xl font-black text-amber-500">
            {/* {formatMoney(price, "USD")} */}${product.price}
          </p>
          <button
            class="w-full p-3 mt-3 font-bold text-white uppercase bg-indigo-600 rounded hover:bg-indigo-800"
            // onClick={() => {
            //   // setProduct(product)
            //   toggleProductModal();
            //   setProductSelected(product);
            // }}
          >
            Agregar
          </button>
        </figcaption>
      </figure>
    </section>
  );
});
