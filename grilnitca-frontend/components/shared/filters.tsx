"use client";
import React from "react";
import { Title } from "./title";
import { Button, Input } from "../ui";
import { FiltersGroup } from "./filters-group";
import { useFilters } from "@/hooks";

export interface FiltersProps {
  className?: string;
}

export const Filters: React.FC<FiltersProps> = ({ className }) => {
  const { selectedIngredients, toggleIngredients, priceRange, updatePrice } =
    useFilters();
  return (
    <div className={className}>
      <Title size="m">Цена от и до:</Title>
      <div className="flex justify-between gap-3 mt-1.5 mb-4">
        <Input
          type="number"
          placeholder="От 0₽"
          min={0}
          max={9999}
          onChange={(e) => updatePrice("priceFrom", e.target.value)}
          value={priceRange.priceFrom || ""}
        />
        <Input
          type="number"
          placeholder="До 9999₽"
          min={0}
          max={9999}
          onChange={(e) => updatePrice("priceTo", e.target.value)}
          value={priceRange.priceTo || ""}
        />
      </div>
      <FiltersGroup
        selectedIngredients={selectedIngredients}
        toggleIngredients={toggleIngredients}
      />
      <Button className="mt-3 w-full cursor-pointer">Применить</Button>
    </div>
  );
};
