"use client";

import { Product } from "@/app/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFavoriteProduct } from "@/app/hooks/useFavoriteProduct";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export function ProductCard({ product, addToCart }: ProductCardProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    toast.success("Produto adicionado aos favoritos!");
    queryClient.invalidateQueries({ queryKey: ["favoriteList"] });
  };

  const handleError = () => {
    toast.error("Erro ao favoritar o produto.");
  };

  const { addFavorite, isPending } = useFavoriteProduct(
    handleSuccess,
    handleError,
  );

  const viewProductDetails = (productName: string) => {
    router.push(`/product/${productName}`);
  };

  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <Image
          src={product.fotos[0].src}
          className="card-img-top"
          alt={product.descricao}
          width={300}
          height={320}
          loading="eager"
          style={{ cursor: "pointer" }}
          onClick={() => viewProductDetails(product.id)}
        />

        <div className="card-body bg-light">
          <h5 className="card-title">{product.nome}</h5>
          <p className="card-text text-secondary">R$ {product.preco}</p>

          <button
            className="btn btn-dark d-block w-100 mb-2"
            type="button"
            onClick={() => addToCart(product)}
          >
            Adicionar no carrinho
          </button>

          {/* Botão de Favoritar chamando o seu addFavorite */}
          <button
            className="btn btn-link text-decoration-none text-secondary w-100 btn-sm"
            type="button"
            disabled={isPending}
            onClick={() => addFavorite(product)}
          >
            {isPending ? "Favoritando..." : "Favoritar"}
          </button>
        </div>
      </div>
    </div>
  );
}
