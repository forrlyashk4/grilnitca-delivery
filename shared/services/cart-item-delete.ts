import { axiosInstance } from "./axios-instance";
import { CartDTO } from "./dto/cart.dto";

export const cartItemDelete = async (cartItemID: number) => {
  const { data } = await axiosInstance.delete<CartDTO>(`/cart/${cartItemID}`);

  return data;
};
