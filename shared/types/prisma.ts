import { Ingredient, Product, ProductOption } from "@/generated/prisma/client";

export type ProductWithRelations = Product & { ingredients: Ingredient[] } & {
  options: ProductOption[];
};
