import { create } from "zustand";
import { cartSearch } from "../services";
import { CartDTO, CartItemDTO } from "../services/dto/cart.dto";

interface CartStateItem {
  id: number;
  name: string;
  imageUrl: string;
  size: number;
  type: number;
  quantity: number;
  price: number;
  categoryId: number;
  disabled: boolean;
  ingredients: Array<{ name: string; price: number }>;
}

interface CartState {
  items: CartStateItem[];
  error: boolean;
  loading: boolean;
  amount: number;

  fetchCartItems: () => Promise<void>;
}

function calcCartItemPrice(cartItem: CartItemDTO): number {
  const ingredientsPrice = cartItem.ingredients.reduce(
    (acc, item) => acc + item.price,
    0
  );

  return (ingredientsPrice + cartItem.item.price) * cartItem.quantity;
}

function normalizeCartData(data: CartDTO): {
  items: CartStateItem[];
  amount: number;
} {
  const items = data.items.map((cartItem) => {
    return {
      id: cartItem.id,
      name: cartItem.item.products.name,
      imageUrl: cartItem.item.products.imageUrl,
      categoryId: cartItem.item.products.categoryId,
      size: cartItem.item.size,
      type: cartItem.item.type,
      quantity: cartItem.quantity,
      price: calcCartItemPrice(cartItem),
      disabled: false,
      ingredients: cartItem.ingredients.map((ingredient) => {
        return {
          name: ingredient.name,
          price: ingredient.price,
        };
      }),
    };
  });

  return {
    items,
    amount: data.amount,
  };
}

export const useCartStore = create<CartState>()((set) => ({
  items: [],
  error: false,
  loading: true,
  amount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await cartSearch();
      console.log(data);
      set(normalizeCartData(data));
    } catch (err) {
      console.log(err);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
