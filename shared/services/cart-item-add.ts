import { axiosInstance } from "./axios-instance";
import { CartDTO } from "./dto/cart.dto";

export const cartItemAdd = async (
  variationId: number,
  ingredients?: number[]
) => {
  const { data } = await axiosInstance.post<CartDTO>(`/cart`, {
    variationId,
    ingredients,
  });

  return data;
};
