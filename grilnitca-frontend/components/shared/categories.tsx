"use client";
import clsx from "clsx";
import React, { useState } from "react";
import { Button } from "../ui";

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

  const [activeIndex, setActiveIndex] = useState(0);

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
            variant={activeIndex === item[0] ? "default" : "ghost"}
            onClick={() => {
              handleScrollToCategory(item[1]);
              setActiveIndex(item[0]);
            }}
            className={activeIndex === item[0] ? "" : "cursor-pointer"}
          >
            {item[1]}
          </Button>
        );
      })}
    </div>
  );
};
