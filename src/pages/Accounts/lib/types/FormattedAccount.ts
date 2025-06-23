import { IAccountResponse } from "../../../../lib/responses/accounts";

export type FormattedAccount = IAccountResponse & {
  createdAt: string;
};