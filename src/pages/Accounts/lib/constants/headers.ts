import { TableHeaderType } from "../../../../components/Table/lib/types";
import AccountStatusChip from "../../components/AccountStatusChip";
import { FormattedAccount } from "../types/FormattedAccount";

export const accountsHeaders: TableHeaderType<FormattedAccount>[] = [
  {
    label: 'Name',
    name: 'name',
  },
  {
    label: 'Email',
    name: 'email',
  },
  {
    label: 'Created',
    name: 'createdAt',
  },
  {
    label: 'Status',
    name: 'status',
    CustomRenderComponent: ({ row }) => AccountStatusChip({ isActive: row.isActive }),
  }
]