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
import { useCart } from "@/shared/hooks";
import { sizeLables, typesLables } from "@/shared/lib/consts";

export interface CartDrawerProps {
  children: ReactNode;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ children }) => {
  const { loading, error, items, amount } = useCart(true);

  return (
    <Sheet>
      <SheetTrigger className="group relative cursor-pointer flex bg-primary text-white rounded-md py-2 px-4 w-max h-full items-center">
        {children}
      </SheetTrigger>

      <SheetContent className="bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle className="text-2xl">
            Товаров в корзине <span className="font-bold">{items.length}</span>
          </SheetTitle>
          <SheetDescription>Это будет очень вкусно!</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 overflow-y-auto">
          {items.map((item) => {
            return (
              <CartItem
                key={item.id}
                cartItem={{
                  id: item.id,
                  name: item.name,
                  imageUrl: item.imageUrl,
                  details: [
                    `${typesLables[item.categoryId][item.type] || "Обычная"}, ${
                      sizeLables[item.size].toLowerCase() || "средняя"
                    }`,
                    `+ ${item.ingredients
                      .map((item) => item.name)
                      .join(", ")
                      .toLowerCase()}`,
                  ],
                  quantity: item.quantity,
                  price: item.price,
                  disabled: false,
                  onClickQuantityButton: (type) => {
                    console.log(type);
                  },
                  onClickRemove: () => {},
                }}
              />
            );
          })}
        </div>

        <SheetFooter className="bg-white">
          <p>
            Итого: <span className="font-bold">{amount} руб.</span>
          </p>
          <Button className="cursor-pointer">Оформить заказ</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
