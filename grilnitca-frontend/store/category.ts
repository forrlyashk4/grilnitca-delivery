import { create } from "zustand";

interface CategoryState {
  activeId: string;
  updateId: (id: string) => void;
}

export const useCategoryStore = create<CategoryState>()((set) => ({
  activeId: "Пицца",
  updateId: (id: string) => set({ activeId: id }),
}));
