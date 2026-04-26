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
    products: searchQuery.data ?? [], // Fallback to empty array to prevent map errors
    isFirstLoading: searchQuery.isLoading, // True only on the first load
    isRefreshing: searchQuery.isFetching, // True on every background update
    hasError: searchQuery.isError,
    error: searchQuery.error,
    refetch: searchQuery.refetch,
  };
};
