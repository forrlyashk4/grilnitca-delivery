import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";

export interface ProductCardProps {
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ className }) => {
  return (
    <div className={clsx("w-72", className)}>
      <div className="bg-red-50 p-5 relative z-0 w-72 h-72 rounded-md object-cover z-0">
        <Image
          fill
          src="https://novoaltaisk.grilnica.ru/cdn/ea2845fbce9df862e6c7ee1cbc15c219_ehsuyrn5ctl.png"
          alt="Роллини Пепперони"
        />
      </div>
      <Title size="l" className="mt-3">
        Роллини Пепперони
      </Title>
      <p className="mt-1.5 text-gray-400 leading-snug text-base">
        Тесто, сыр моцарелла, пепперони, соус цезарь, яичный меланж, кунжут
        белый.
      </p>
      <div className="flex justify-between items-center mt-1.5">
        <span className="text-xl font-bold">220 ₽</span>
        <Button className="flex gap-1 items-center cursor-pointer">
          <Plus size={18} />
          <span>Добавить</span>
        </Button>
      </div>
    </div>
  );
};
