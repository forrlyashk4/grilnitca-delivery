import { useEffect } from "react";
import { useCartStore } from "../store/cart";

export function useCart(runFetch?: boolean) {
  const {
    items,
    loading,
    error,
    amount,
    fetchCartItems,
    updateCartItemQuantity,
    addCartItem,
    deleteCartItem,
  } = useCartStore();

  useEffect(() => {
    if (runFetch) fetchCartItems();
  }, [runFetch, fetchCartItems]);

  return {
    items,
    loading,
    error,
    amount,

    updateCartItemQuantity,
    addCartItem,
    deleteCartItem,
  };
}
