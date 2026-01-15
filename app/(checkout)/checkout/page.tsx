import { CheckoutForm } from "@/shared/components/shared";
import React from "react";

export interface CheckoutPageProps {
  className?: string;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ className }) => {
  return (
    <>
      <CheckoutForm />
    </>
  );
};

export default CheckoutPage;
