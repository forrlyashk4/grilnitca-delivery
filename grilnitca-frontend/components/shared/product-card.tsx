import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";
import { Ingredient, Product, ProductOption } from "@/generated/prisma/client";

export interface ProductCardProps {
  className?: string;
  data: Product & { ingredients: Ingredient[] } & {
    options: ProductOption[];
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({
  data,
  className,
}) => {
  return (
    <div className={clsx("w-72", className)}>
      <div className="bg-red-50 p-5 relative w-72 h-72 rounded-md object-cover z-0">
        <Image fill src={data.imageUrl} alt={data.name} />
      </div>
      <Title size="l" className="mt-3">
        {data.name}
      </Title>
      {data.ingredients && (
        <p className="mt-1.5 text-gray-400 leading-snug text-base">
          {data.ingredients
            .map((item) => item.name)
            .join(", ")
            .toLowerCase()}
        </p>
      )}
      <div className="flex justify-between items-center mt-5">
        <span className="text-xl font-bold">от {data.options[0].price}₽</span>
        <Button className="flex gap-1 items-center cursor-pointer">
          <Plus size={18} />
          <span>Добавить</span>
        </Button>
      </div>
    </div>
  );
};
