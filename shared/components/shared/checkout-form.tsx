import React from "react";
import { Container } from "./container";
import { cn } from "@/shared/lib/utils";
import { WhiteBlock } from "./white-block";
import { Input } from "../ui";

export interface CheckoutFormProps {
  className?: string;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ className }) => {
  return (
    <>
      <Container className="flex items-center justify-between py-8 gap-8">
        <div
          className={cn("flex gap-8 justify-between items-start", className)}
        >
          <div className="flex flex-1 gap-8 flex-col">
            <WhiteBlock title="1. Корзина">
              <h1>Пицца</h1>
              <h1>Пицца</h1>
              <h1>Пицца</h1>
              <h1>Пицца</h1>
            </WhiteBlock>
            <WhiteBlock title="2. Персональная информация">
              <div>
                <p>Имя получателя</p>
                <Input type="text" className="h-12 text-md" />
              </div>
            </WhiteBlock>
          </div>
          <div></div>
        </div>
      </Container>
    </>
  );
};
