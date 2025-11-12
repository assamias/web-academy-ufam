import { Produto } from "../types/produtos";
import { apiFavoritos } from "./api";

export async function postFavorito(produto: Produto): Promise<Produto> {
  const response = await apiFavoritos.post("/favoritos", produto);
  return response.data;
}

export async function getFavoritos(): Promise<Produto[]> {
  const response = await apiFavoritos.get("/favoritos");
  return response.data;
}

export async function deleteFavorito(id: string | number): Promise<void> {
  await apiFavoritos.delete(`/favoritos/${id}`);
}
