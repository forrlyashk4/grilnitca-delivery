"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  Button,
} from "../../ui";
import React, { ReactNode } from "react";
import { CartItem } from "./cart-item";

export interface CartDrawerProps {
  children: ReactNode;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger className="group relative cursor-pointer flex bg-primary text-white rounded-md py-2 px-4 w-max h-full items-center">
        {children}
      </SheetTrigger>

      <SheetContent className="bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle className="text-2xl">
            В корзине <span className="font-bold">2 товара</span>
          </SheetTitle>
          <SheetDescription>Это будет очень вкусно!</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 overflow-y-auto">
          <CartItem
            cartItem={{
              id: 1,
              name: "Гавайская",
              imageUrl: "/products/product-1.png",
              details: ["Большая, сырная", "+ маринованные огурчики"],
              quantity: 4,
              price: 369,
              disabled: false,
              onClickQuantityButton: (type) => {
                console.log(type);
              },
              onClickRemove: () => {},
            }}
          />

          <CartItem
            cartItem={{
              id: 1,
              name: "Гавайская",
              imageUrl: "/products/product-1.png",
              details: ["Большая, сырная", "+ маринованные огурчики"],
              quantity: 1,
              price: 369,
              disabled: true,
              onClickQuantityButton: (type) => {
                console.log(type);
              },
              onClickRemove: () => {},
            }}
          />
        </div>

        <SheetFooter className="bg-white">
          <p>
            Итого: <span className="font-bold">520 руб.</span>
          </p>
          <Button className="cursor-pointer">Оформить заказ</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
