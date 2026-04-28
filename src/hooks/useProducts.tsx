import { httpClient } from "@/utils/httpClient";
import { useQuery } from "@tanstack/react-query";
import type { IProduct } from "@/interface/types";

interface UseProductsOptions {
  limit?: number;
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const { limit = 15 } = options;

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["getProductList", limit],
    queryFn: async (): Promise<IProduct[]> => {
      const response = await httpClient.get(`/products?limit=${limit}`);
      return response.data;
    },
    placeholderData: (previousData) => previousData,
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    staleTime: 30000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    products: data ?? [],
    isFirstLoading: isLoading,
    isRefreshing: isFetching,
    hasError: isError,
    error: error,
    refetch: refetch,
  };
};
