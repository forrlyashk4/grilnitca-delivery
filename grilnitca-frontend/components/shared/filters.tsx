import React from "react";
import { Title } from "./title";
import { Button, Input } from "../ui";
import { FiltersGroup } from "./filters-group";

export interface FiltersProps {
  className?: string;
}

export const Filters: React.FC<FiltersProps> = ({ className }) => {
  return (
    <div className={className}>
      <Title size="m">Цена от и до:</Title>
      <div className="flex justify-between gap-3 mt-1.5 mb-4">
        <Input type="number" placeholder="От 0₽" min={0} max={9999} />
        <Input type="number" placeholder="До 9999₽" min={0} max={9999} />
      </div>
      <FiltersGroup />
      <Button className="mt-3 w-full cursor-pointer">Применить</Button>
    </div>
  );
};
