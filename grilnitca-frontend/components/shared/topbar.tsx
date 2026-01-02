import React from "react";
import { Container } from "./container";
import clsx from "clsx";
import { SortPopup } from "./sort-popup";
import { Categories } from "./categories";
import { Category, Product } from "@/generated/prisma/client";

export interface TopBarProps {
  className?: string;
  categories: (Category & { products: Product[] })[];
}

export const TopBar: React.FC<TopBarProps> = ({ categories, className }) => {
  return (
    <div className={clsx("py-5 sticky top-0 bg-white z-10", className)}>
      <Container>
        <div className="flex justify-between">
          <Categories categories={categories} />
          <SortPopup />
        </div>
      </Container>
    </div>
  );
};
