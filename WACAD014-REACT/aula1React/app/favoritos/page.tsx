"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useListaFavoritos } from "../hooks/useFavoritos";

import ListagemFavoritos from "../components/ListagemFavoritos/ListagemFavoritos";

export default function Favoritos() {
  const {
    favoritos,
    isPending,
    isError,
    refetchFavoritos: refetch,
  } = useListaFavoritos();

  if (isPending) {
    return (
      <div className="container p-5">
        <h5>Carregando favoritos...</h5>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container p-5">
        <div className="alert alert-danger">
          Erro ao carregar produtos favoritos. Por favor, tente novamente.
        </div>
      </div>
    );
  }

  if (!favoritos || favoritos.length === 0) {
    return (
      <div className="container p-5">
        <div className="alert alert-info">
          Você ainda não possui produtos favoritos.
        </div>
      </div>
    );
  }

  return (
    <div className="container p-3">
      <h5 className="mb-3">Seus Produtos Favoritos</h5>
      <ListagemFavoritos
        itensFavoritos={favoritos}
        refecthFavoritos={refetch}
      />
    </div>
  );
}
