import { CartItemType } from "@/app/types/cartItem";

interface CartItemProps {
  cartItem: CartItemType;
  removeItemFromCart: (id: string) => void;
}

export function CartItem(props: CartItemProps) {
  const { cartItem, removeItemFromCart } = props;
  const { id, nome, preco, quantidade } = cartItem;

  const getProductTotal = (price: number, quantity: number): number =>
    price * quantity;

  return (
    <tr>
      <td>{nome}</td>
      <td>R$ {preco.toFixed(2)}</td>
      <td>{quantidade}</td>
      <td>R$ {getProductTotal(preco, quantidade).toFixed(2)}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => removeItemFromCart(id)}
        >
          Remover
        </button>
      </td>
    </tr>
  );
}
