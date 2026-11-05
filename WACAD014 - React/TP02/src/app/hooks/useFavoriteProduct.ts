import { useMutation } from "@tanstack/react-query";
import { addFavoriteProduct } from "../services/favorites";

export function useFavoriteProduct(onSuccess: () => void, onError: () => void) {
  const { mutate, isPending } = useMutation({
    mutationFn: addFavoriteProduct,
    onSuccess,
    onError,
  });

  return { addFavorite: mutate, isPending };
}
