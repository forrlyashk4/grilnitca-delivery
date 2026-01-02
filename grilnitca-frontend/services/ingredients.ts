import { Ingredient } from "../generated/prisma/client";
import { axiosInstance } from "./axios-instance";

export const ingredientList = async () => {
  const { data } = await axiosInstance.get<Ingredient[]>("/ingredients");

  return data;
};
