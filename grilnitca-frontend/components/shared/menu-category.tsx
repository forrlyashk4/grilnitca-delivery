"use client";
import React, { useEffect, useRef } from "react";
import { Title } from "./title";
import { ProductCard } from "./product-card";
import { useIntersection } from "react-use";
export interface MenuCategoryProps {
  className?: string;
  title: string;
}

export const MenuCategory: React.FC<MenuCategoryProps> = ({
  className,
  title,
}) => {
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
      console.log(title, "на коне");
    }
  }, [intersection, title]);

  return (
    <div className={className} id={title}>
      <Title size="xl">{title}</Title>
      <div
        className="mt-5 mb-20 grid grid-cols-3 gap-12.5"
        ref={intersectionRef}
      >
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};
