import { Nunito } from "next/font/google";
import { Header } from "@/shared/components/shared";
import { cn } from "@/shared/lib/utils";

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function CheckedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log(nunito.className);
  return (
    <html lang="ru">
      <body className={nunito.className}>
        <div className="min-h-screen bg-[#F4F1EE]">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
