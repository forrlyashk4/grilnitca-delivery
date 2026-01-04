import { ProductModal } from "@/shared/components/shared/product-modal";
import { prisma } from "@/shared/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      options: true,
    },
  });

  if (!product) return notFound();

  return <ProductModal product={product} />;
}
