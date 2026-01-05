import { RosterItem } from "@/generated/prisma/client";
import { axiosInstance } from "./axios-instance";

export const rosterList = async () => {
  const { data } = await axiosInstance.get<RosterItem[]>("/roster-items");

  return data;
};
