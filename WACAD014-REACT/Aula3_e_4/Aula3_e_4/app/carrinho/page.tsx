"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ResumoCarrinho from "../components/ResumoCarrinho/ResumoCarrinho";
import ListagemCarrinho from "../components/ListagemCarrinho/ListagemCarrinho";
import { mockItensCarrinho } from "../mocks/itensCarrinho";
import { ItemCarrinhoType } from "../types/carrinho";

export default function Carrinho() {
  const [itensCarrinho, setItensCarrinho] =
    React.useState<ItemCarrinhoType[]>(mockItensCarrinho);

  const removerItemDoCarrinho = (id: string): void => {
    const novosItensCarrinho = itensCarrinho.filter((item) => item.id !== id);
    setItensCarrinho(novosItensCarrinho);
  };

  const quantidadeTotal = itensCarrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  const valorTotal = itensCarrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  return (
    <>
      <main>
        <div className="container p-5">
          <ListagemCarrinho
            itensCarrinho={itensCarrinho}
            onRemoverItem={removerItemDoCarrinho}
          />
          <ResumoCarrinho
            quantidadeTotal={quantidadeTotal}
            valorTotal={valorTotal}
          />
        </div>
      </main>
    </>
  );
}
