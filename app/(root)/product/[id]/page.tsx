import { Container, ProductInfo } from "@/shared/components/shared";
import { prisma } from "@/shared/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      options: true,
      ingredients: true,
      roster: true,
    },
  });

  if (!data) return notFound();

  return (
    <>
      <Container className="mt-12">
        <ProductInfo product={data}></ProductInfo>
      </Container>
    </>
  );
}
