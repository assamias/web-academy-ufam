"use client";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { useProdutoDetalhe } from "@/app/hooks/useProdutoDetalhes";

export default function Produto() {
  const params = useParams();
  const nomeProduto = Array.isArray(params.produto)
    ? params.produto[0]
    : params.produto;

  const { produto, isLoading, isError } = useProdutoDetalhe(nomeProduto);

  if (isLoading) {
    return (
      <div className="container p-5 text-center">
        <h5 className="text-secondary">Carregando detalhes do produto...</h5>
      </div>
    );
  }
  if (isError || !produto) {
    return (
      <div className="container p-5 text-center">
        <h5 className="text-danger">Erro ao carregar detalhes do produto.</h5>
      </div>
    );
  }

  return (
    <main>
      <div className="container p-5">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>

            <h5 className="card-title mb-4 fw-bold">{produto.nome}</h5>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-3">
              <Image
                src={produto.fotos[0].src}
                alt={produto.fotos[0].titulo}
                width={300}
                height={320}
              />
            </div>

            <p className="card-text fw-medium">Valor: R${produto.preco}</p>
            <p className="card-text fw-medium">
              Descrição: {produto.descricao}{" "}
            </p>
            <p className="card-text fw-medium">
              Anunciado por: {produto.usuario_id}{" "}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
