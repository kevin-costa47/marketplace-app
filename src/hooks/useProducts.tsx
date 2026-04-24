import { httpClient } from "../utils/httpClient";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  const searchQuery = useQuery({
    queryKey: ["getProductList"],
    queryFn: async () => {
      const response = await httpClient.get("/products?limit=15");
      return response.data;
    },
    placeholderData: (previousData) => previousData,
  });

  return {
    products: searchQuery.data,
    isSearching: searchQuery.isFetching,
    hasError: searchQuery.isError,
  };
};
