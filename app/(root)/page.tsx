import {
  Container,
  Title,
  TopBar,
  Filters,
  MenuCategory,
} from "@/shared/components/shared";
import { prisma } from "@/shared/lib/prisma";
import { Suspense } from "react";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          options: true,
        },
      },
    },
  });

  return (
    <>
      <Container className="mt-12">
        <Title size="xl">Наше меню</Title>
      </Container>

      <TopBar categories={categories} />

      <Container>
        <div className="flex items-start gap-15 mt-4">
          <Suspense>
            <Filters className="w-61" />
          </Suspense>
          <div>
            {categories.map((item) => {
              return (
                <MenuCategory
                  key={item.id}
                  title={item.name}
                  products={item.products}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </>
  );
}
