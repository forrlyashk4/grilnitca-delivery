import { NextResponse } from "next/server";
import { prisma } from "./prisma";
import { calcCartItemPrice } from "./calc-item-price";

export async function updateCartData(token: string) {
  const userCart = await prisma.cart.findFirst({
    where: {
      token,
    },

    include: {
      items: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          item: {
            include: {
              products: true,
            },
          },
          ingredients: true,
        },
      },
    },
  });

  if (!userCart) return NextResponse.json({ error: "Cart not found" });

  const cartAmount = userCart.items.reduce((acc, item) => {
    return acc + calcCartItemPrice(item);
  }, 0);

  return await prisma.cart.update({
    where: {
      id: userCart.id,
    },

    data: {
      amount: cartAmount,
    },

    include: {
      items: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          item: {
            include: {
              products: true,
            },
          },
          ingredients: true,
        },
      },
    },
  });
}
