"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ListagemProdutos from "./components/ListagemProdutos/ListagemProdutos";
import ResumoCarrinho from "./components/ResumoCarrinho/ResumoCarrinho";
import { mockProdutos } from "./mocks/produtos";
import { Produto } from "./types/produtos";

export default function Produtos() {
  const [quantidadeTotal, setQuantidadeTotal] = React.useState<number>(0);
  const [valorTotal, setValorTotal] = React.useState<number>(0);

  const adicionarAoCarrinho = (produto: Produto) => {
    setQuantidadeTotal(quantidadeTotal + 1);
    setValorTotal(valorTotal + Number(produto.preco));
  };

  return (
    <div>
      <main>
        <div className="container p-5">
          <ResumoCarrinho
            quantidadeTotal={quantidadeTotal}
            valorTotal={valorTotal}
          />
          <ListagemProdutos
            produtos={mockProdutos}
            onAdicionarAoCarrinho={adicionarAoCarrinho}
          />
        </div>
      </main>
    </div>
  );
}
