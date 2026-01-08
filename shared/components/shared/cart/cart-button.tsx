import React from "react";
import { CartDrawer } from "./cart-drawer";
import { cn } from "@/shared/lib/utils";
import { Button } from "../../ui";
import { ArrowRight, ShoppingCart } from "lucide-react";

export interface CartButtonProps {
  className?: string;
}

export const CartButton: React.FC<CartButtonProps> = ({ className }) => {
  return (
    <CartDrawer>
      <Button className={cn("group relative cursor-pointer", className)}>
        <b className="leading-[initial]">520 ₽</b>
        <span className="h-full w-px bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart className="h-4 w-4 relative" />
          <b className="leading-[initial]">3</b>
        </div>
        <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
      </Button>
    </CartDrawer>
  );
};
