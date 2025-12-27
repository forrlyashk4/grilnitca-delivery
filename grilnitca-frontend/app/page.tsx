import {
  Container,
  Title,
  TopBar,
  Filters,
  MenuCategory,
} from "@/components/shared";

export default async function Home() {
  return (
    <>
      <Container className="mt-12">
        <Title size="xl">Наше меню</Title>
      </Container>

      <TopBar />

      <Container>
        <div className="flex items-start gap-15 mt-4">
          <Filters className="w-61" />
          <div>
            <MenuCategory title="Пицца" />
            <MenuCategory title="Роллы" />
            <MenuCategory title="Шаурма" />
            <MenuCategory title="Напитки" />
            <MenuCategory title="Просто поесть" />
            <MenuCategory title="Фри" />
            <MenuCategory title="Вок" />
          </div>
        </div>
      </Container>
    </>
  );
}
