"use client";
import React, { useEffect, useRef } from "react";
import { Title } from "./title";
import { ProductCard } from "./product-card";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/store/category";
import { Ingredient, Product, ProductOption } from "@/generated/prisma/client";
export interface MenuCategoryProps {
  className?: string;
  title: string;
  products: (Product & { ingredients: Ingredient[] } & {
    options: ProductOption[];
  })[];
}

export const MenuCategory: React.FC<MenuCategoryProps> = ({
  className,
  products,
  title,
}) => {
  const updateId = useCategoryStore((state) => state.updateId);

  const intersectionRef = useRef<HTMLDivElement | null>(null);
  const intersection = useIntersection(
    intersectionRef as React.RefObject<HTMLDivElement>,
    {
      rootMargin: "100px",
      threshold: 0.4,
    }
  );

  useEffect(() => {
    if (intersection?.isIntersecting) {
      updateId(title);
    }
  }, [intersection, updateId, title]);

  return (
    <div className={className} id={title}>
      <Title size="xl">{title}</Title>
      <div
        className="mt-5 mb-20 grid grid-cols-3 gap-12.5"
        ref={intersectionRef}
      >
        {products.map((item) => {
          return <ProductCard data={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};
