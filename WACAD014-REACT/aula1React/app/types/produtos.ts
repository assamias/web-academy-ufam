type ProdutoFoto = {
  titulo: string;
  src: string;
};

export type Produto = {
  id: string;
  fotos: ProdutoFoto[];
  nome: string;
  preco: string;
  descricao: string;
  vendido: string;
  usuario_id: string;
};
