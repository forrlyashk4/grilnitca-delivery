"use client";
import clsx from "clsx";
import React, { useState } from "react";
import { Button } from "../ui";

export interface CategoriesProps {
  className?: string;
}

export const Categories: React.FC<CategoriesProps> = ({ className }) => {
  const categories: [number, string][] = [
    [0, "Пиццы"],
    [1, "Роллы"],
    [2, "Шаурма"],
    [3, "Напитки"],
    [4, "Просто поесть"],
    [5, "Фри"],
    [6, "Вок"],
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={clsx("p-1.5 bg-gray-50 rounded-md flex gap-1", className)}>
      {categories.map((item) => {
        return (
          <a href={`#${item[1]}`} key={item[0]}>
            <Button
              variant={activeIndex === item[0] ? "default" : "ghost"}
              onClick={() => setActiveIndex(item[0])}
            >
              {item[1]}
            </Button>
          </a>
        );
      })}
    </div>
  );
};
