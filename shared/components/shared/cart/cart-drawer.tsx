"use client";

import Image from "next/image";
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
import { LoaderCircle } from "lucide-react";
import { Title } from "../title";

export interface CartDrawerProps {
  children: ReactNode;
  className?: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  children,
  className,
}) => {
  const { loading, items, amount, updateCartItemQuantity, deleteCartItem } =
    useCart(true);

  function onClickQuantityButton(
    type: "minus" | "plus",
    quantity: number,
    itemId: number
  ) {
    if (type === "plus") {
      const nextQuantity = quantity + 1;
      updateCartItemQuantity(itemId, nextQuantity);
    } else if (quantity > 1) {
      const nextQuantity = quantity - 1;
      updateCartItemQuantity(itemId, nextQuantity);
    }
  }

  return (
    <Sheet>
      <SheetTrigger
        className={`group relative cursor-pointer flex bg-primary text-white rounded-md py-2 px-4 w-max h-full items-center ${className}`}
      >
        {children}
      </SheetTrigger>

      <SheetContent className="bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle className="text-2xl">
            Товаров в корзине <span className="font-bold">{items.length}</span>
          </SheetTitle>
          <SheetDescription>Это будет очень вкусно!</SheetDescription>
        </SheetHeader>

        {loading && items.length === 0 && (
          <LoaderCircle className="spin m-auto animate-spin" />
        )}

        {!loading && items.length === 0 && (
          <div className="m-auto text-center">
            <Image
              src="/empty-cart.png"
              alt="Корзина пуста"
              width={250}
              height={250}
            />
            <Title size="m" className="mt-8">
              В корзине пусто
            </Title>
            <p>добавьте свою любимую вкусняшку!</p>
          </div>
        )}

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
                  disabled: item.disabled,
                  onClickQuantityButton: onClickQuantityButton,
                  onClickRemove: deleteCartItem,
                }}
              />
            );
          })}
        </div>

        <SheetFooter className="bg-white">
          <p>
            Итого: <span className="font-bold">{amount} руб.</span>
          </p>
          <Button loading={loading} className="cursor-pointer">
            Оформить заказ
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
