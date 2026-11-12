import { useContext } from "react";
import { FavoritesContext } from "./FavoritesProvider";

export function useFavoritesContext() {
  const favoritesContext = useContext(FavoritesContext);

  if (!favoritesContext) {
    throw new Error("useFavoritesContext must be within a FavoritesProvider");
  }

  return favoritesContext;
}
