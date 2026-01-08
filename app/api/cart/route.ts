import { prisma } from "@/shared/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("cartToken")?.value;

  if (!token) {
    return NextResponse.json({ totalAmount: 0, items: [] });
  }

  const cart = await prisma.cart.findFirst({
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

  return NextResponse.json(cart);
}
