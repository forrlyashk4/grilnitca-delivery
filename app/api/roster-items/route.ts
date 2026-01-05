import { prisma } from "@/shared/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.rosterItem.findMany();

  return NextResponse.json(products);
}
