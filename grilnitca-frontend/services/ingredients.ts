import { Ingredient } from "../generated/prisma/client";
import { axiosInstance } from "./axios-instance";

export const ingredientList = async (query: string) => {
  const { data } = await axiosInstance.get<Ingredient[]>("/ingredients", {
    params: { query },
  });

  return data;
};
