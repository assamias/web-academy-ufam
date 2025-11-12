"use client";
import React from "react";
import ItemCarrinho from "../ItemCarrinho/ItemCarrinho";
import { ItemCarrinhoType } from "@/app/types/carrinho";

interface ListagemCarrinhoProps {
  itensCarrinho: ItemCarrinhoType[];
  onRemoverItem: (id: string) => void;
}

export default function ListagemCarrinho({
  itensCarrinho,
  onRemoverItem,
}: ListagemCarrinhoProps) {
  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-light">Produtos Selecionados</h5>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Valor Unitário</th>
                <th>Quantidade</th>
                <th>Valor Total</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {itensCarrinho.map((itemCarrinho) => (
                <ItemCarrinho
                  key={itemCarrinho.id}
                  itemCarrinho={itemCarrinho}
                  onRemoverItem={onRemoverItem}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
