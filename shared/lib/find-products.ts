import { ProductOrderByWithRelationInput } from "@/generated/prisma/models";
import { prisma } from "./prisma";

function getSortMethod(
  sortIndex: number
):
  | ProductOrderByWithRelationInput
  | ProductOrderByWithRelationInput[]
  | undefined {
  if (sortIndex === 1) return { id: "desc" };
  if (sortIndex === 4) return { id: "asc" };
  return undefined;
}

export async function findProducts(searchParams: Record<string, string>) {
  const roster = searchParams.roster
    ? searchParams.roster.split(",")
    : undefined;
  const ingredients = searchParams.ingredients
    ? searchParams.ingredients.split(",")
    : undefined;
  const priceFrom = searchParams.priceFrom || undefined;
  const priceTo = searchParams.priceTo || undefined;
  const sortIndex = Number(searchParams.sortBy) || 1;

  let data = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          options: {
            orderBy: {
              price: "asc",
            },
          },
        },
        orderBy: getSortMethod(sortIndex),
        where: {
          ingredients:
            ingredients !== undefined
              ? {
                  some: {
                    name: {
                      in: ingredients,
                    },
                  },
                }
              : undefined,
          roster:
            roster !== undefined
              ? {
                  some: {
                    name: {
                      in: roster,
                    },
                  },
                }
              : undefined,
          options: {
            every: {
              price: {
                gte: Number(priceFrom || 0),
                lte: Number(priceTo || 10000),
              },
            },
          },
        },
      },
    },
  });

  if (sortIndex === 2) {
    data = data.map((category) => {
      return {
        ...category,
        products: category.products.sort((a, b) => {
          const aMin = Math.min(...a.options.map((option) => option.price));
          const bMin = Math.min(...b.options.map((option) => option.price));

          return aMin - bMin;
        }),
      };
    });
  }

  if (sortIndex === 3) {
    data = data.map((category) => {
      return {
        ...category,
        products: category.products.sort((a, b) => {
          const aMax = Math.max(...a.options.map((option) => option.price));
          const bMax = Math.max(...b.options.map((option) => option.price));

          return bMax - aMax;
        }),
      };
    });
  }

  return data;
}
