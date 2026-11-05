"use client";

import { FavoriteList } from "@/app/components/Favorite/FavoriteList/FavoriteList";
import { useFavoriteList } from "@/app/hooks/useFavoriteList";

export default function FavoritesPage() {
  const { favorites, isPending, isError } = useFavoriteList();

  if (isPending) {
    return (
      <main className="container p-5 text-center">
        <h5 className="fw-bold">Carregando favoritos...</h5>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="container p-5 text-center text-danger">
        <h5 className="fw-bold">Erro ao carregar favoritos.</h5>
      </main>
    );
  }

  return (
    <main className="container p-5">
      <FavoriteList favorites={favorites || []} />
    </main>
  );
}
