import { prisma } from "@/shared/lib/prisma";
import { updateCartData } from "@/shared/lib/update-cart-data";
import { CreateCartItem } from "@/shared/services/dto/cart.dto";
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

export async function POST(req: NextRequest) {
  const data = (await req.json()) as CreateCartItem;

  let token = req.cookies.get("cartToken")?.value;
  if (!token) {
    token = crypto.randomUUID();
  }

  let userCart = await prisma.cart.findFirst({
    where: {
      token,
    },
  });
  if (!userCart) {
    userCart = await prisma.cart.create({
      data: {
        token,
      },
    });
  }

  const existingProduct = await prisma.cartItem.findFirst({
    where: {
      cartId: userCart.id,
      productId: data.variationId,
      ingredients: {
        every: {
          id: { in: data.ingredients },
        },
      },
    },
  });

  if (!existingProduct) {
    console.log("data 1: ", data);
    await prisma.cartItem.create({
      data: {
        cartId: userCart.id,
        productId: data.variationId,
        quantity: 1,
        ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
      },
    });
  } else {
    console.log("data 2: ", data);
    await prisma.cartItem.update({
      where: {
        id: existingProduct.id,
      },
      data: {
        quantity: existingProduct.quantity + 1,
      },
    });
  }

  const nextCart = await updateCartData(token);

  const resp = NextResponse.json(nextCart);
  resp.cookies.set("cartToken", token);
  return resp;
}
