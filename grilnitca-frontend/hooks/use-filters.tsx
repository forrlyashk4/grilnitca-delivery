import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import qs from "qs";
import { useSet } from "react-use";

type PriceProps = {
  priceFrom?: number;
  priceTo?: number;
};

export const useFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(","))
  );

  const [priceRange, setPriceRange] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")?.split(",")) || undefined,
    priceTo: Number(searchParams.get("priceTo")?.split(",")) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: string) => {
    setPriceRange((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  React.useEffect(() => {
    const params = {
      ingredients: Array.from(selectedIngredients),
      priceFrom: priceRange.priceFrom || undefined,
      priceTo: priceRange.priceTo || undefined,
    };

    const query = qs.stringify(params, { arrayFormat: "comma" });

    router.push(`?${query}`, { scroll: false });
  }, [selectedIngredients, priceRange, router]);

  return React.useMemo(
    () => ({ selectedIngredients, toggleIngredients, priceRange, updatePrice }),
    [selectedIngredients, toggleIngredients, priceRange]
  );
};
