interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
  limit?: string;
  page?: string;
}

export const getSearchParams = (url: string) => {
  const { searchParams } = new URL(url);

  const params = Object.fromEntries(searchParams);

  return params as GetSearchParams;
};
