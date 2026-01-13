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

  const [selectedRoster, { toggle: toggleRoster }] = useSet(
    new Set<string>(searchParams.get("roster")?.split(","))
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

  const initSortIndex = searchParams.get("sortBy");

  const [sortIndex, setSortIndex] = React.useState(
    Number(initSortIndex) > 0 && Number(initSortIndex) < 5
      ? Number(initSortIndex)
      : 1
  );

  React.useEffect(() => {
    const params = {
      ingredients: Array.from(selectedIngredients),
      roster: Array.from(selectedRoster),
      priceFrom: priceRange.priceFrom || undefined,
      priceTo: priceRange.priceTo || undefined,
      sortBy: sortIndex,
    };

    const query = qs.stringify(params, { arrayFormat: "comma" });

    router.push(`?${query}`, { scroll: false });
  }, [selectedIngredients, selectedRoster, priceRange, router, sortIndex]);

  return React.useMemo(
    () => ({
      selectedIngredients,
      toggleIngredients,
      selectedRoster,
      toggleRoster,
      priceRange,
      updatePrice,
      sortIndex,
      setSortIndex,
    }),
    [
      selectedIngredients,
      toggleIngredients,
      selectedRoster,
      toggleRoster,
      priceRange,
      sortIndex,
    ]
  );
};
