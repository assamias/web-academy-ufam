"use client";
import React from "react";
import { ItemCarrinhoType } from "@/app/types/carrinho";

interface ItemCarrinhoProps {
  itemCarrinho: ItemCarrinhoType;
  onRemoverItem: (id: string) => void;
}

export default function ItemCarrinho({
  itemCarrinho,
  onRemoverItem,
}: ItemCarrinhoProps) {
  const valorTotalProduto = (
    precoUnitario: number,
    quantidade: number
  ): number => precoUnitario * quantidade;

  return (
    <tr>
      <td>{itemCarrinho.nome}</td>
      <td>R$ {itemCarrinho.preco}</td>
      <td>{itemCarrinho.quantidade}</td>
      <td>
        R${" "}
        {valorTotalProduto(itemCarrinho.preco, itemCarrinho.quantidade).toFixed(
          2
        )}
      </td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onRemoverItem(itemCarrinho.id)}
        >
          Remover
        </button>
      </td>
    </tr>
  );
}
