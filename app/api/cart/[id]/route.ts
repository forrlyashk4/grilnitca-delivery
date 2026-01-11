import { prisma } from "@/shared/lib/prisma";
import { updateCartData } from "@/shared/lib/update-cart-data";
import { NextResponse, NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("cartToken")?.value;
  const { id: cartItemID } = await params;
  const nextQuantity = (await req.json()).quantity as number;

  if (!token) {
    return NextResponse.json({ error: "Cart token not found" });
  }

  const cartItem = await prisma.cartItem.findFirst({
    where: {
      id: Number(cartItemID),
    },
  });

  if (!cartItem) {
    return NextResponse.json({ error: "Cart item not found" });
  }

  await prisma.cartItem.update({
    where: {
      id: Number(cartItemID),
    },
    data: {
      quantity: nextQuantity,
    },
  });

  const cart = await updateCartData(token);

  return NextResponse.json(cart);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("cartToken")?.value;
  const { id: cartItemID } = await params;

  if (!token) {
    return NextResponse.json({ error: "Cart token not found" });
  }

  const cartItem = await prisma.cartItem.findFirst({
    where: {
      id: Number(cartItemID),
    },
  });

  if (!cartItem) {
    return NextResponse.json({ error: "Cart item not found" });
  }

  await prisma.cartItem.delete({
    where: {
      id: Number(cartItemID),
    },
  });

  const cart = await updateCartData(token);

  return NextResponse.json(cart);
}
