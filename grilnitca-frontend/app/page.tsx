import { Container, Title, TopBar, Filters } from "@/components/shared";

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
          <h1>привет!</h1>
        </div>
      </Container>
    </>
  );
}
