import React from "react";
import { CartDrawer } from "./cart-drawer";
import { ArrowRight, ShoppingCart } from "lucide-react";

export const CartButton: React.FC = () => {
  return (
    <CartDrawer>
      <b className="leading-[initial] text-sm">520 ₽</b>
      <span className="h-full w-px bg-white/30 mx-3" />
      <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
        <ShoppingCart className="h-4 w-4 relative" />
        <b className="leading-[initial] text-sm">3</b>
      </div>
      <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
    </CartDrawer>
  );
};
