import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { GetUsersQueryType } from "../../services/users";
import { PaginatedUsersResponse } from "../../responses/users";
import { useDefaultErrorHandler } from "../useDefaultErrorHandler";
import { APIBaseError } from "../../types/errors/apiBaseError.type";
import { httpGETAccountUsers } from "../../services/accounts";


export const useAccountUsers = (query: GetUsersQueryType, accountId: string)=>{
  const keys = Object.values(query);
  const {
    data: response,
    isLoading,
    error,
  } = useQuery<AxiosResponse<PaginatedUsersResponse>, AxiosError<APIBaseError>>({
    queryKey: ['account-users', ...keys, accountId],
    queryFn: () => httpGETAccountUsers(query, accountId),
    staleTime: Infinity,
  })
  useDefaultErrorHandler(error);
  const { data } = response || {};
  return {
    data,
    isLoading,
    error,
  }
}