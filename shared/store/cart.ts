import { create } from "zustand";
import { cartItemAdd, cartItemUpdate, cartSearch } from "../services";
import { CartDTO } from "../services/dto/cart.dto";
import { calcCartItemPrice } from "../lib/calc-item-price";

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
  updateCartItemQuantity: (
    itemId: number,
    nextQuantity: number
  ) => Promise<void>;
  addCartItem: (variationId: number, ingredients: number[]) => Promise<void>;
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
      set(normalizeCartData(data));
    } catch (err) {
      console.log(err);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateCartItemQuantity: async (itemId: number, nextQuantity: number) => {
    try {
      set({ loading: true, error: false });
      const data = await cartItemUpdate(nextQuantity, itemId);
      set(normalizeCartData(data));
    } catch (err) {
      console.log(err);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  addCartItem: async (variationId: number, ingredients: number[]) => {
    try {
      set({ loading: true, error: false });
      const data = await cartItemAdd(variationId, ingredients);
      set(normalizeCartData(data));
    } catch (err) {
      console.log(err);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
