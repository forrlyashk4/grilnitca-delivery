import { axiosInstance } from "./axios-instance";
import { CartDTO } from "./dto/cart.dto";

export const cartSearch = async () => {
  const { data } = await axiosInstance.get<CartDTO>("/cart");

  return data;
};
