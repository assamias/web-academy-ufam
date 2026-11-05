import { CartItemType } from "@/app/types/cartItem";
import { CartItem } from "../CartItem/CartItem";

interface CartListProps {
  cartItems: CartItemType[];
  removeItemFromCart: (id: string) => void;
}

export function CartList({ cartItems, removeItemFromCart }: CartListProps) {
  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-light">Produtos selecionados</h5>

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
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  cartItem={item}
                  removeItemFromCart={removeItemFromCart}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
