import { cn } from "@/shared/lib/utils";
import React from "react";
import Image from "next/image";
import { Title } from "../title";
import { Button } from "../../ui";
import { Trash2 } from "lucide-react";

export interface CartItemProps {
  className?: string;
  cartItem: {
    id: number;
    name: string;
    imageUrl: string;
    details: string[];
    quantity: number;
    price: number;
    disabled: boolean;
    onClickQuantityButton: (
      type: "minus" | "plus",
      quantity: number,
      itemId: number
    ) => void;
    onClickRemove: (cartItemID: number) => Promise<void>;
  };
}

export const CartItem: React.FC<CartItemProps> = ({ className, cartItem }) => {
  return (
    <div
      className={cn(
        `flex gap-2 items-start bg-white px-4 py-2 ${
          cartItem.disabled === true ? "opacity-50 pointer-events-none" : ""
        }`,
        className
      )}
    >
      <Image
        src={cartItem.imageUrl}
        alt={cartItem.name}
        width={75}
        height={75}
      />
      <div className="w-full">
        <Title size="xs">{cartItem.name}</Title>
        <p className="text-gray-600 text-sm">{cartItem.details[0]}</p>
        <p className="text-gray-600 text-sm">{cartItem.details[1]}</p>
        <div className="mt-2 py-4 border-t flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                cartItem.onClickQuantityButton(
                  "minus",
                  cartItem.quantity,
                  cartItem.id
                );
              }}
              disabled={cartItem.quantity === 1 ? true : false}
              className={cn(
                "px-2! py-0.5! h-auto! rounded-sm border border-primary text-primary font-bold cursor-pointer",
                cartItem.quantity === 1 && "border-gray text-black"
              )}
              variant={cartItem.quantity === 1 ? "default" : "outline"}
            >
              -
            </Button>
            <div className="text-lg">{cartItem.quantity}</div>
            <Button
              onClick={() => {
                cartItem.onClickQuantityButton(
                  "plus",
                  cartItem.quantity,
                  cartItem.id
                );
              }}
              className="px-2! py-0.5! h-auto! rounded-sm border border-primary text-primary font-bold cursor-pointer"
              variant="outline"
            >
              +
            </Button>
          </div>
          <div className="flex gap-2.5 items-center">
            <p className="font-bold">{cartItem.price} руб.</p>
            <Trash2
              width={16}
              height={16}
              color="gray"
              className="cursor-pointer"
              onClick={() => {
                cartItem.onClickRemove(cartItem.id);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
