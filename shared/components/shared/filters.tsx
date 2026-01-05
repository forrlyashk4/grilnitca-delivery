"use client";
import React from "react";
import { Title } from "./title";
import { Button, Input } from "../ui";
import { FiltersGroup } from "./filters-group";
import { useFilters, useIngredients } from "@/shared/hooks";
import { useRosterItems } from "@/shared/hooks/use-roster-items";

export interface FiltersProps {
  className?: string;
}

export const Filters: React.FC<FiltersProps> = ({ className }) => {
  const {
    selectedIngredients,
    toggleIngredients,
    selectedRoster,
    toggleRoster,
    priceRange,
    updatePrice,
  } = useFilters();
  const { ingredients, isLoading: isLoadingIngredients } = useIngredients();
  const { rosterItems, isLoading: isLoadingRoster } = useRosterItems();
  return (
    <div className={className}>
      <Title size="m">Цена:</Title>
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
        selectedIngredients={selectedRoster}
        toggleIngredients={toggleRoster}
        itemsList={rosterItems}
        isLoading={isLoadingRoster}
        label={"Ингредиенты в составе"}
      />
      <FiltersGroup
        selectedIngredients={selectedIngredients}
        toggleIngredients={toggleIngredients}
        itemsList={ingredients}
        isLoading={isLoadingIngredients}
        label={"Можно добавить"}
      />
      <Button className="mt-3 w-full cursor-pointer">Применить</Button>
    </div>
  );
};
