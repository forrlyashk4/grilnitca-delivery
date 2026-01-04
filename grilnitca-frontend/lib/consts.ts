export const sizeLables = {
  1: "Маленькая",
  2: "Средняя",
  3: "Большая",
};

type labelsObject = {
  [key: number]: {
    [key: number]: string;
  };
};

export const typesLables: labelsObject = {
  2: {
    // Пицца
    1: "Русская",
    2: "Итальянская",
  },
  1: {
    // Шаурма
    1: "Обычная",
    2: "Чесночная",
    3: "Сырная",
  },
};
