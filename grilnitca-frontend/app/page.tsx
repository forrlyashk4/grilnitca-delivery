import {
  Container,
  Title,
  TopBar,
  Filters,
  MenuCategory,
} from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-12">
        <Title size="2xl">Наше меню</Title>
      </Container>

      <TopBar />

      <Container>
        <div className="flex items-start gap-15 mt-4">
          <Filters className="w-61" />
          <div>
            <MenuCategory />
            <MenuCategory />
          </div>
        </div>
      </Container>
    </>
  );
}
