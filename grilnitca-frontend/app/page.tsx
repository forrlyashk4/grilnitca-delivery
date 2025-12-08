import { Container, Title, TopBar } from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-12">
        <Title size="2xl">Наше меню</Title>
      </Container>

      <TopBar />

      <div style={{ height: 3000, background: "red" }}></div>
    </>
  );
}
