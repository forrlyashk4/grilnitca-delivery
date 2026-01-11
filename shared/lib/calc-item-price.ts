import { CartItemDTO } from "../services/dto/cart.dto";

export function calcCartItemPrice(cartItem: CartItemDTO): number {
  const ingredientsPrice = cartItem.ingredients.reduce(
    (acc, item) => acc + item.price,
    0
  );

  return (ingredientsPrice + cartItem.item.price) * cartItem.quantity;
}
