import { Ingredient } from "@/generated/prisma/client";
import { ingredientList } from "@/services";
import React from "react";

export const useIngredients = () => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function getIngredientsList() {
      try {
        setIsLoading(true);
        const ingredients = await ingredientList();
        setIngredients(ingredients);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getIngredientsList();
  }, []);

  return { ingredients, isLoading };
};
