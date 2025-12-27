"use client";
import React, { useState } from "react";
import { Title } from "./title";
import { Button, Checkbox, Input } from "../ui";

export interface FiltersGroupProps {
  className?: string;
}

export const FiltersGroup: React.FC<FiltersGroupProps> = ({ className }) => {
  const ingredients: [string, number][] = [
    ["Сырный соус", 0],
    ["Немецкие колбаски", 1],
    ["Оливки", 2],
    ["Томаты", 3],
    ["Сыр", 4],
    ["Маринованные огурчики", 5],
    ["Зелень", 6],
  ];
  const [isShowAll, setShowAll] = useState(false);
  const itemsToShow = 4;

  const [searchStr, setSearchStr] = useState("");
  const filteredIngredients = ingredients.filter((item) =>
    item[0].toLowerCase().startsWith(searchStr)
  );

  return (
    <div className={className}>
      <Title size="m">Можно добавить:</Title>
      <div>
        {isShowAll && (
          <Input
            placeholder="Найти"
            className="my-2"
            onChange={(e) => setSearchStr(e.target.value.toLowerCase())}
          />
        )}
        <div className="overflow-auto scrollbar max-h-35">
          {filteredIngredients.map((item, index) => {
            if (isShowAll || index < itemsToShow) {
              return (
                <div
                  key={item[1]}
                  className="flex gap-1.5 items-center mt-2 cursor-pointer"
                >
                  <Checkbox
                    className="w-5 h-5 cursor-pointer"
                    id={`ing-${item[0]}`}
                  />
                  <label
                    className="leading-[initial] cursor-pointer"
                    htmlFor={`ing-${item[0]}`}
                  >
                    {item[0]}
                  </label>
                </div>
              );
            }
          })}
        </div>
        {ingredients.length > itemsToShow && !isShowAll && (
          <Button
            variant="link"
            className="cursor-pointer pl-0.5"
            onClick={() => setShowAll(true)}
          >
            + Показать всё
          </Button>
        )}
      </div>
    </div>
  );
};
