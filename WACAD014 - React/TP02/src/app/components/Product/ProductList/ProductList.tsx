import { useProductList } from "@/app/hooks/useProductList";
import { Product } from "@/app/types/product";
import { ProductCard } from "../ProductCard/ProductCard";

interface ProductListProps {
  addToCart: (product: Product) => void;
}

export function ProductList({ addToCart }: ProductListProps) {
  const { products, isPending, isError } = useProductList();

  if (isPending) return "Carregando dados...";

  if (isError) return "Ocorreu um erro. Tente novamente mais tarde!";

  if (products.length === 0) return "Não há produtos disponíveis no momento!";

  return (
    <>
      <h5 className="mb-3">Produtos disponíveis:</h5>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </>
  );
}
