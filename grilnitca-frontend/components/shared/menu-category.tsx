import React from "react";
import { Title } from "./title";
import { ProductCard } from "./product-card";

export interface MenuCategoryProps {
  className?: string;
}

export const MenuCategory: React.FC<MenuCategoryProps> = ({ className }) => {
  return (
    <div className={className}>
      <Title size="xl">Крутые штуки</Title>
      <div className="mt-5 mb-20 grid grid-cols-3 gap-12.5">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};
