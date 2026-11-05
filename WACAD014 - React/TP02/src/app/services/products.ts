import { productsApi } from "./api";

export function getProductList() {
  return productsApi.get("/produto").then((response) => response.data);
}

export function getProductDetail(product: string) {
  return productsApi
    .get(`/produto/${product}`)
    .then((response) => response.data);
}
