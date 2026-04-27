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
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
  });

  return {
    products: searchQuery.data ?? [],
    isFirstLoading: searchQuery.isLoading,
    isRefreshing: searchQuery.isFetching,
    hasError: searchQuery.isError,
    error: searchQuery.error,
    refetch: searchQuery.refetch,
  };
};
