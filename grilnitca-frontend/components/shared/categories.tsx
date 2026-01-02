"use client";
import clsx from "clsx";
import React from "react";
import { Button } from "../ui";
import { useCategoryStore } from "@/store/category";
import { Category, Product } from "@/generated/prisma/client";
export interface CategoriesProps {
  categories: (Category & { products: Product[] })[];
  className?: string;
}

export const Categories: React.FC<CategoriesProps> = ({
  categories,
  className,
}) => {
  const activeId = useCategoryStore((state) => state.activeId);

  const handleScrollToCategory = (categoryId: string) => {
    const htmlElement = document.getElementById(categoryId);
    if (!htmlElement) return;

    const y = htmlElement.getBoundingClientRect().top + window.scrollY - 100;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  return (
    <div className={clsx("p-1.5 bg-gray-50 rounded-md flex gap-1", className)}>
      {categories.map((item) => {
        return (
          <Button
            key={item.id}
            variant={activeId === item.name ? "secondary" : "ghost"}
            onClick={() => {
              handleScrollToCategory(item.name);
            }}
            className={activeId === item.name ? "" : "cursor-pointer"}
          >
            {item.name}
          </Button>
        );
      })}
    </div>
  );
};
