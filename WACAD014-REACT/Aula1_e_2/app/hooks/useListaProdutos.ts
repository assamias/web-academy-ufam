import { useQuery } from "@tanstack/react-query";
import { getListaProdutos } from "../services/produtos";

export function useListaProdutos() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["listaProdutos"],
    queryFn: () => getListaProdutos(),
  });

  return { produtos: data, isLoading, isError };
}
