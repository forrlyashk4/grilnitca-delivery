"use client";
import clsx from "clsx";
import React from "react";
import { Button } from "../ui";
import { useCategoryStore } from "@/store/category";
export interface CategoriesProps {
  className?: string;
}

export const Categories: React.FC<CategoriesProps> = ({ className }) => {
  const categories: [number, string][] = [
    [0, "Пицца"],
    [1, "Роллы"],
    [2, "Шаурма"],
    [3, "Напитки"],
    [4, "Просто поесть"],
    [5, "Фри"],
    [6, "Вок"],
  ];

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
            key={item[0]}
            variant={activeId === item[1] ? "default" : "ghost"}
            onClick={() => {
              handleScrollToCategory(item[1]);
            }}
            className={activeId === item[1] ? "" : "cursor-pointer"}
          >
            {item[1]}
          </Button>
        );
      })}
    </div>
  );
};
