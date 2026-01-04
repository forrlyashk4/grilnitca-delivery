import { getSearchParams } from "@/shared/lib/get-search-params";
import { prisma } from "@/shared/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const params = getSearchParams(req.url);

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: params.query,
        mode: "insensitive",
      },
    },
    take: 5,
  });

  return NextResponse.json(products);
}
