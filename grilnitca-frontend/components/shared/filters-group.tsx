"use client";
import React, { useState } from "react";
import { Title } from "./title";
import { Button, Checkbox, Input, Skeleton } from "../ui";
import { useIngredients } from "@/hooks";

export interface FiltersGroupProps {
  selectedIngredients: Set<string>;
  toggleIngredients: (key: string) => void;
  className?: string;
}

export const FiltersGroup: React.FC<FiltersGroupProps> = ({
  selectedIngredients,
  toggleIngredients,
  className,
}) => {
  const { ingredients, isLoading } = useIngredients();
  const [isShowAll, setShowAll] = useState(false);
  const itemsToShow = 4;

  const [searchStr, setSearchStr] = useState("");
  const filteredIngredients = ingredients.filter((item) =>
    item.name.toLowerCase().startsWith(searchStr)
  );

  return (
    <div className={className}>
      <Title size="m">Можно добавить:</Title>
      {isLoading ? (
        <div className="mt-2">
          {...Array(itemsToShow)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} className="w-auto h-6 mb-2" />
            ))}
          <Skeleton className="w-28 h-4 my-2" />
        </div>
      ) : (
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
                    key={item.id}
                    className="flex gap-1.5 items-center mt-2 cursor-pointer"
                  >
                    <Checkbox
                      className="w-5 h-5 cursor-pointer"
                      id={`ing-${item.name}`}
                      checked={selectedIngredients.has(item.name)}
                      onCheckedChange={() => toggleIngredients(item.name)}
                    />
                    <label
                      className="leading-[initial] cursor-pointer"
                      htmlFor={`ing-${item.name}`}
                    >
                      {item.name}
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
      )}
    </div>
  );
};
