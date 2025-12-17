"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";

interface IFavoritosContext {
  favoritos: Produto[];

  // (2) true/false se está favoritado
  isFavorito: (id: string) => boolean;

  // (3) remover por id
  removerFavorito: (id: string) => void;

  // (4) adicionar produto
  adicionarFavorito: (produto: Produto) => void;

  // (5) total dos favoritos
  totalFavoritos: number;
}

// Importante: null para conseguir validar uso fora do Provider
export const FavoritosContext = createContext<IFavoritosContext | null>(null);

// (1) custom hook que retorna o contexto
export const useFavoritosContext = () => {
  const favoritosContext = useContext(FavoritosContext);
  if (!favoritosContext) {
    throw new Error("useFavoritosContext deve ser usado dentro de um FavoritosProvider");
  }
  return favoritosContext;
};

interface FavoritosProviderProps {
  children: React.ReactNode;
}

const FavoritosProvider = ({ children }: FavoritosProviderProps) => {
  const [favoritos, setFavoritos] = useState<Produto[]>([]);

  // (2)
  const isFavorito = useCallback(
    (id: string) => favoritos.some((p) => p.id === id),
    [favoritos]
  );

  // (3)
  const removerFavorito = useCallback((id: string) => {
    setFavoritos((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // (4)
  const adicionarFavorito = useCallback((produto: Produto) => {
    setFavoritos((prev) => {
      if (prev.some((p) => p.id === produto.id)) return prev; // evita duplicar
      return [...prev, produto];
    });
  }, []);

  // (5) total usando seu helper e o preço com desconto (igual você já usa na UI)
  const totalFavoritos = useMemo(() => {
    return favoritos.reduce((acc, produto) => {
      const precoNumber = Number(produto.preco);
      const valorFinal = calculaValorComPorcentagemDeDesconto(precoNumber, produto.desconto);
      return acc + valorFinal;
    }, 0);
  }, [favoritos]);

  const values = useMemo(
    () => ({
      favoritos,
      isFavorito,
      removerFavorito,
      adicionarFavorito,
      totalFavoritos,
    }),
    [favoritos, isFavorito, removerFavorito, adicionarFavorito, totalFavoritos]
  );

  return <FavoritosContext.Provider value={values}>{children}</FavoritosContext.Provider>;
};

export default FavoritosProvider;
