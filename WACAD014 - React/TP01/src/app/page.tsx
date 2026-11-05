"use client";

import { useState } from "react";
import { CartSummary } from "./components/Cart/CartSummary/CartSummary";
import { ProductList } from "./components/Product/ProductList/ProductList";
import { mockProducts } from "./mocks/products";
import { Product } from "./types/product";

export default function Products() {
  const [qtdTotalItems, setQtdTotalItems] = useState<number>(0);
  const [totalPurchase, setTotalPurchase] = useState<number>(0);

  const addToCart = (product: Product): void => {
    const price = Number(product.preco);

    setQtdTotalItems((prev) => prev + 1);
    setTotalPurchase((prev) => prev + price);
  };

  return (
    <main>
      <div className="container p-5">
        <CartSummary
          qtdTotalItems={qtdTotalItems}
          totalPurchase={totalPurchase}
        />

        <ProductList products={mockProducts} addToCart={addToCart} />
      </div>
    </main>
  );
}
