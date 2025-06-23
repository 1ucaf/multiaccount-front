import { useQuery } from "@tanstack/react-query";
import { GetAccountsQueryType, httpGETAccounts } from "../../services/accounts";
import { AxiosError, AxiosResponse } from "axios";
import { PaginatedAccountsResponse } from "../../responses/accounts";

export const useAccounts = (query: GetAccountsQueryType) => {
  const {
    data: response,
    isLoading,
    error,
  } = useQuery<AxiosResponse<PaginatedAccountsResponse>, AxiosError>({
    queryKey: ['accounts', ...Object.values(query)],
    queryFn: () => httpGETAccounts(query),
    staleTime: Infinity,
  })
  const { data } = response || {};
  return {
    data,
    isLoading,
    error,
  }
};