import {
  Ingredient,
  Product,
  ProductOption,
  RosterItem,
} from "@/generated/prisma/client";

export type ProductWithRelations = Product & { ingredients: Ingredient[] } & {
  roster: RosterItem[];
} & {
  options: ProductOption[];
};
