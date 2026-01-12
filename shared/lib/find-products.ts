import { prisma } from "./prisma";

export async function findProducts(searchParams: Record<string, string>) {
  const roster = searchParams.roster
    ? searchParams.roster.split(",")
    : undefined;
  const ingredients = searchParams.ingredients
    ? searchParams.ingredients.split(",")
    : undefined;
  const priceFrom = searchParams.priceFrom || undefined;
  const priceTo = searchParams.priceTo || undefined;

  return await prisma.category.findMany({
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
        orderBy: {
          id: "desc",
        },
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
}
