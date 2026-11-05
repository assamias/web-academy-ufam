import { useMutation } from "@tanstack/react-query";
import { removeFavoriteProduct } from "../services/favorites";

export function useRemoveFavorite(
  onSuccess?: () => void,
  onError?: (error: unknown) => void,
) {
  const { mutate } = useMutation({
    mutationFn: (id: string) => removeFavoriteProduct(id),
    onSuccess,
    onError,
  });

  return { removeFavorite: mutate };
}
