import { useQuery } from "@tanstack/react-query";
import { getProductList } from "../services/products";

export function useProductList() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["productList"],
    queryFn: getProductList,
  });

  return { products: data, isPending, isError };
}
