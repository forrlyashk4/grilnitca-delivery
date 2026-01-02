"use client";

import { Search } from "lucide-react";
import React, { useRef, useState } from "react";
import clsx from "clsx";
import { searchProducts } from "@/services";
import { useClickAway, useDebounce } from "react-use";
import { Product } from "@/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";

export interface ProductSearchProps {
  className?: string;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({ className }) => {
  const [searchValue, setSearchValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const inputRef = useRef(null);

  useClickAway(inputRef, () => {
    setFocused(false);
  });

  useDebounce(
    async () => {
      const products = await searchProducts(searchValue);
      setProducts(products);
    },
    100,
    [searchValue]
  );

  return (
    <>
      {focused && (
        <div className="bg-black/60 fixed top-0 bottom-0 left-0 right-0 z-60"></div>
      )}
      <div
        className={clsx(
          "w-full bg-gray-100 rounded-md flex gap-2 items-center relative z-70",
          className
        )}
        ref={inputRef}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-2 h-4 text-gray-400" />
        <input
          className="w-full py-2.5 outline-none pl-9"
          placeholder="Найти вкусное..."
          type="text"
          onFocus={() => setFocused(true)}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {products.length > 0 && (
          <div
            className={clsx(
              "absolute top-12 w-full bg-white rounded-md p-2 transition-all duration-150 invisible opacity-0 z-30 shadow-md",
              focused && "visible opacity-100 top-14"
            )}
          >
            {products.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="flex items-center gap-4 py-2 hover:bg-primary/10 transition-all duration-100 rounded-md"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={48}
                    height={48}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
