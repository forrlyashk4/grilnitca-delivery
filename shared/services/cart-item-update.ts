import { axiosInstance } from "./axios-instance";
import { CartDTO } from "./dto/cart.dto";

export const cartItemUpdate = async (nextQuantity: number, id: number) => {
  const { data } = await axiosInstance.patch<CartDTO>(`/cart/${id}`, {
    quantity: nextQuantity,
  });

  return data;
};
