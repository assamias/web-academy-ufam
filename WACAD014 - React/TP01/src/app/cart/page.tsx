"use client";

import { useState } from "react";
import { CartList } from "../components/Cart/CartList/CartList";
import { CartSummary } from "../components/Cart/CartSummary/CartSummary";
import { mockCartItems } from "../mocks/cartItems";

export default function Cart() {
  const [cartItems, setCartItems] = useState(mockCartItems);

  const qtdTotalItems = cartItems.reduce((acc, item) => {
    return acc + item.quantidade;
  }, 0);

  const totalPurchase = cartItems.reduce((acc, item) => {
    return acc + item.preco * item.quantidade;
  }, 0);

  const removeItemFromCart = (id: string): void => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <main>
      <div className="container p-5">
        <CartList
          cartItems={cartItems}
          removeItemFromCart={removeItemFromCart}
        />

        <CartSummary
          qtdTotalItems={qtdTotalItems}
          totalPurchase={totalPurchase}
        />
      </div>
    </main>
  );
}
