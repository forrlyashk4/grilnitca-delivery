import React from "react";
import { Container } from "./container";
import clsx from "clsx";
import { SortPopup } from "./sort-popup";
import { Categories } from "./categories";

export interface TopBarProps {
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ className }) => {
  return (
    <div className={clsx("py-5 sticky top-0 bg-white", className)}>
      <Container>
        <div className="flex justify-between">
          <Categories />
          <SortPopup />
        </div>
      </Container>
    </div>
  );
};
