import {
  Container,
  Title,
  TopBar,
  Filters,
  MenuCategory,
} from "@/shared/components/shared";
import { findProducts } from "@/shared/lib/find-products";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const categories = await findProducts(params);

  return (
    <>
      <Container className="mt-12">
        <Title size="xl">Наше меню</Title>
      </Container>

      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />

      <Container>
        <div className="flex items-start gap-15 mt-4">
          <Suspense>
            <Filters className="w-61" />
          </Suspense>
          <div>
            {categories.map((category) => {
              return (
                category.products.length > 0 && (
                  <MenuCategory
                    key={category.id}
                    title={category.name}
                    products={category.products}
                  />
                )
              );
            })}
          </div>
        </div>
      </Container>
    </>
  );
}
