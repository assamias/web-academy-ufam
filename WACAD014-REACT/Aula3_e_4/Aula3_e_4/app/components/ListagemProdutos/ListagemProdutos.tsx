import "bootstrap/dist/css/bootstrap.min.css";
import CardProduto from "../CardProduto/CardProduto";
import { Produto } from "@/app/types/produtos";
import { useListaProdutos } from "@/app/hooks/useListaProdutos";

interface ListagemProdutosProps {
  produtos?: Produto[];
  onAdicionarAoCarrinho: (produto: Produto) => void;
}

export default function ListagemProdutos({
  produtos: produtosProp,
  onAdicionarAoCarrinho,
}: ListagemProdutosProps) {
  const { produtos: produtosFetch, isLoading, isError } = useListaProdutos();

  const produtos = produtosProp ?? produtosFetch;

  if (isLoading && !produtos) {
    return <div>Carregando produtos...</div>;
  }
  if (!produtos || produtos.length === 0) {
    if (isError) {
      return (
        <div className="alert alert-danger">
          Erro ao carregar produtos. Por favor, recarregue a página.
        </div>
      );
    }
    return <div>Nenhum produto encontrado.</div>;
  }

  return (
    <div>
      <h5 className="mb-3">Produtos Disponíveis</h5>
      {isError && (
        <div className="alert alert-warning small" role="alert">
          Aviso: Ocorreu um erro ao tentar atualizar a lista de produtos (Ranek
          API). Os dados mostrados podem estar desatualizados.
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {produtos.map((produto: Produto) => (
          <CardProduto
            key={produto.id}
            produto={produto}
            onAdicionarAoCarrinho={onAdicionarAoCarrinho}
          />
        ))}
      </div>
    </div>
  );
}
