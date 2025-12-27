import { Product } from "../generated/prisma/client";
import { axiosInstance } from "./axios-instance";

export const searchProducts = async (query: string) => {
  const { data } = await axiosInstance.get<Product[]>("/products/search", {
    params: { query },
  });

  return data;
};
