"use client";

import { useState, ReactNode, createContext } from "react";
import { toast } from "react-toastify";
import { Product } from "../../types/product";
import { calculateDiscountedPrice } from "../../helpers";

export interface FavoritesContextType {
  favorites: Product[];
  totalFavoritesValue: number;
  addFavorite: (product: Product) => void;
  removeFavorite: (id: string) => void;
  checkIsFavorite: (id: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  totalFavoritesValue: 0,
  addFavorite: () => {},
  removeFavorite: () => {},
  checkIsFavorite: () => false,
});

export default function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const addFavorite = (product: Product) => {
    if (favorites.some((item) => item.id === product.id)) {
      return;
    }

    toast.success("Produto favoritado com sucesso!");

    setFavorites((currentFavorites) => [...currentFavorites, product]);
  };

  const removeFavorite = (id: string) => {
    toast.error("Produto removido dos favoritos!");

    setFavorites((currentFavorites) =>
      currentFavorites.filter((item) => item.id !== id),
    );
  };

  const checkIsFavorite = (id: string) => {
    return favorites.some((item) => item.id === id);
  };

  const totalFavoritesValue = favorites.reduce((acc, product) => {
    const discounted = calculateDiscountedPrice(
      Number(product.preco),
      product.desconto,
    );
    return acc + discounted;
  }, 0);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        totalFavoritesValue,
        addFavorite,
        removeFavorite,
        checkIsFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
