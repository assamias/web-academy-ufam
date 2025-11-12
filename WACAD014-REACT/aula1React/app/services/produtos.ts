import { Produto } from "../types/produtos";
import { apiProdutos } from "./api";

export type produtoDetalhe = Produto & {
  descricao: string;
  usuario_id: string;
};

export async function getListaProdutos(): Promise<Produto[]> {
  return apiProdutos.get("/produto").then((response) => response.data);
}

export async function getProdutoDetalhe(nome: string): Promise<Produto> {
  return apiProdutos.get(`/produto/${nome}`).then((response) => response.data);
}
