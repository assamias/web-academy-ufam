"use client";
import { useQuery } from "@tanstack/react-query";
import { getProdutoDetalhe, produtoDetalhe } from "../services/produtos";

export function useProdutoDetalhe(nome: string | undefined) {
  const { data, isLoading, isError, error } = useQuery<produtoDetalhe>({
    queryKey: ["produtoDetalhe", nome],
    queryFn: () => getProdutoDetalhe(nome as string),
    enabled: !!nome,
    staleTime: 1000 * 60 * 5,
  });
  return {
    produto: data,
    isLoading,
    isError,
    error,
  };
}
