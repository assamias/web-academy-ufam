import { Product } from "../types/product";
import { favoriteApi } from "./api";

export async function addFavoriteProduct(product: Product) {
  new Promise((resolve) => setTimeout(resolve, 1000));

  return favoriteApi
    .post<Product>("/favoritos", product)
    .then((response) => response.data);
}

export function getFavoriteProducts() {
  return favoriteApi.get("/favoritos").then((response) => response.data);
}

export function removeFavoriteProduct(id: string) {
  return favoriteApi.delete<Product>(`/favoritos/${id}`);
}
