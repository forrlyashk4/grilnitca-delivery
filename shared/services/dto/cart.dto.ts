import {
  Cart,
  CartItem,
  Ingredient,
  Product,
  ProductOption,
} from "@/generated/prisma/client";

export type CartItemDTO = CartItem & {
  item: ProductOption & {
    products: Product;
  };

  ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}
