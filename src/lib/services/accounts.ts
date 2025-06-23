import axios from "axios";
import { GetUsersQueryType } from "./users";

export type GetAccountsQueryType = {
  page: number;
  pageSize: number;
  search?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
};

export const httpGETAccounts = (query: GetAccountsQueryType) => axios.get('/accounts', { params: query });

export const httpGETAccountUsers = (query: GetUsersQueryType, accountId: string) => axios.get(`/users/account/${accountId}`, { params: query });
