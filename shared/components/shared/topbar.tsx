import React from "react";
import { Container } from "./container";
import clsx from "clsx";
import { SortPopup } from "./sort-popup";
import { Categories } from "./categories";

export interface TopBarProps {
  className?: string;
  categories: { name: string; id: number }[];
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
