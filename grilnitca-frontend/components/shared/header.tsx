import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { Container } from "./container";
import { Button } from "../ui";
import { User, ShoppingCart, ArrowRight } from "lucide-react";
import { ProductSearch } from ".";

export interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={clsx("border border-b", className)}>
      <Container className="flex items-center justify-between py-8 gap-8">
        <div className="flex items-center gap-4 mr-8">
          <Image
            src="./logo.svg"
            alt="Логотип Грильницы"
            width={35}
            height={35}
          />
          <div>
            <h1 className="text-2xl uppercase font-black">Грильница</h1>
            <p className="text-sm text-gray-400 leading-3">
              Очень вкусное место
            </p>
          </div>
        </div>

        <ProductSearch />

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2 cursor-pointer"
          >
            <User size={16} />
            <span className="leading-[initial]">Войти</span>
          </Button>
          <div>
            <Button className="group relative cursor-pointer">
              <b className="leading-[initial]">520 ₽</b>
              <span className="h-full w-px bg-white/30 mx-3" />
              <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                <ShoppingCart className="h-4 w-4 relative" />
                <b className="leading-[initial]">3</b>
              </div>
              <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};
