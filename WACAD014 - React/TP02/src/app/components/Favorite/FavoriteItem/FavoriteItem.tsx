"use client";

import { useRemoveFavorite } from "@/app/hooks/useRemoveFavorite";
import { Product } from "@/app/types/product";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface FavoriteItemProps {
  favorite: Product;
}

export function FavoriteItem({ favorite }: FavoriteItemProps) {
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    toast.success("Produto favorito removido!");
    queryClient.invalidateQueries({ queryKey: ["favoriteList"] });
  };

  const handleError = () => {
    toast.error("Erro ao excluir produto favorito. Tente novamente.");
  };

  const { removeFavorite } = useRemoveFavorite(handleSuccess, handleError);

  return (
    <tr>
      <td>{favorite.id}</td>
      <td>{favorite.nome}</td>
      <td>R$ {favorite.preco}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => removeFavorite(favorite.id)}
        >
          Remover
        </button>
      </td>
    </tr>
  );
}
