"use client";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui";
import { ArrowUpDown } from "lucide-react";
import clsx from "clsx";
import { useFilters } from "@/shared/hooks";

export interface SortPopupProps {
  className?: string;
}

const sortItems: Record<number, string> = {
  1: "сначала с лучшей оценкой",
  2: "сначала недорогие",
  3: "сначала дорогие",
  4: "сначала популярное",
};

export const SortPopup: React.FC<SortPopupProps> = ({ className }) => {
  const { sortIndex, setSortIndex } = useFilters();
  const [openPopup, setOpenPopup] = useState(false);

  const [activeSorting, setActiveSorting] = useState(sortItems[sortIndex]);

  React.useEffect(() => {
    if (sortItems[sortIndex]) {
      setActiveSorting(sortItems[sortIndex]);
    } else {
      setActiveSorting(sortItems[1]);
    }
  }, [sortIndex]);

  return (
    <Popover open={openPopup}>
      <PopoverTrigger
        className={clsx(
          "py-1.5 px-5 bg-gray-50 rounded-md flex gap-1.5 items-center cursor-pointer",
          className
        )}
        onClick={() => setOpenPopup(!openPopup)}
      >
        <ArrowUpDown size={16} />
        Сортировка:
        <span className="text-primary">{activeSorting}</span>
      </PopoverTrigger>
      <PopoverContent className="width-60 border-none z-10">
        <ul>
          {Object.entries(sortItems).map((item) => {
            return (
              <li
                key={item[0]}
                onClick={() => {
                  setSortIndex(Number(item[0]));
                  setOpenPopup(false);
                }}
                className="hover:text-primary hover:bg-gray-50 py-2 px-4 cursor-pointer rounded-md transition-all"
              >
                {item[1]}
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
