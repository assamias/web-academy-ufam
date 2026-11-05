"use client";

import { FavoriteItem } from "../FavoriteItem/FavoriteItem";
import { Product } from "@/app/types/product";

interface FavoriteListProps {
  favorites: Product[];
}

export function FavoriteList({ favorites }: FavoriteListProps) {
  if (!favorites || favorites.length === 0) {
    return (
      <div className="alert alert-info text-center my-3" role="alert">
        Sua lista de favoritos está vazia.
      </div>
    );
  }

  return (
    <div className="table-responsive my-3">
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">Produto</th>
            <th scope="col">Preço</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map((favorite) => (
            <FavoriteItem key={favorite.id} favorite={favorite} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
