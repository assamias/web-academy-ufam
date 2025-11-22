import { use } from "react";
import CardProduto from "../CardProduto/CardProduto";
import ResumoFavoritos from "../ResumoFavoritos/ResumoFavoritos";
import { useContext } from "react";
import {
  FavoritosContext,
  useFavoritosContext,
} from "@/app/state/FavoritosProvider";

interface IListagemProdutos {
  produtos: Produto[];
}

export default function ListagemProdutos({ produtos }: IListagemProdutos) {
  const { favoritos, setFavoritos } = useFavoritosContext();

  return (
    <div className="row row-cols-1 row-cols-lg-2">
      <div className="col-lg-9">
        <h5 className="mb-3">Produtos disponíveis:</h5>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
          {produtos.map((produto) => (
            <CardProduto
              key={produto.id}
              produto={produto}
              setFavoritos={setFavoritos}
              favoritos={favoritos}
            />
          ))}
        </div>
      </div>

      <div className="col-lg-3">
        <ResumoFavoritos favoritos={favoritos} setFavoritos={setFavoritos} />
      </div>
    </div>
  );
}
