"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useProductDetail } from "@/app/hooks/useProductDetail";

export default function ProductDetail() {
  const params = useParams();
  const productName = params.product as string;

  const { product, isPending, isError } = useProductDetail(productName);

  if (isPending) return "Carregando...";

  return (
    <main>
      <div className="container p-5">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>

            <h5 className="card-title mb-4 fw-bold">
              Nome produto {product.nome}
            </h5>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-3">
              <Image
                key={product.id}
                src={product.fotos[0].src}
                alt={product.nome}
                width={300}
                height={320}
              />
            </div>

            <p className="card-text fw-medium">
              Valor: R${Number(product.preco).toFixed(2)}
            </p>
            <p className="card-text fw-medium">
              Descrição: {product.descricao}
            </p>
            <p className="card-text fw-medium">
              Anunciado por: {product.usuario_id}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
