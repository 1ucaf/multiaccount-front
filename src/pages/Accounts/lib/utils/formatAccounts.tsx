import { IAccountResponse } from "../../../../lib/responses/accounts";
import { FormattedAccount } from "../types/FormattedAccount";

export const formatAccounts = (accounts: IAccountResponse[] | undefined): FormattedAccount[] => {
  return accounts?.map((account) => {
    return {
      ...account,
      createdAt: new Date(account.date_created).toLocaleString(),
    };
  }) || [];
};