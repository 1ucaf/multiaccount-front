import { PaginatedResponse } from "./paginated";

export type IAccountResponse = {
  date_created: string;
  email: string;
  id: string;
  isActive: boolean;
  name: string;
};

export type PaginatedAccountsResponse = PaginatedResponse<IAccountResponse>;