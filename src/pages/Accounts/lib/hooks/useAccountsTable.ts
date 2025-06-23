import { useEffect, useState } from "react";
import { useAccounts } from "../../../../lib/hooks/accounts/useAccounts";
import { usePagination } from "../../../../lib/hooks/usePagination";
import { formatAccounts } from "../utils/formatAccounts";
import { DatesFilterPopup } from "../../../../components/CommonFiltersPopups/DateCreated";
import { ShowDeletedFilterPopup } from "../../../../components/CommonFiltersPopups/ShowDeleted";
import { AccountStatusFilterPopup } from "../../components/FiltersPopups/Status";
import { TableActionType } from "../../../../components/Table/lib/types";
import { FormattedAccount } from "../types/FormattedAccount";
import { useAccountsTableActions } from "./useAccountsTableActions";

export const useAccountsTable = () => {
  const pagination = usePagination();
  const { query } = pagination;
  const [countState, setCountState] = useState(0);
  const { data, isLoading, error } = useAccounts(query);
  const {
    pauseAccount,
    resumeAccount,
    impersonateAccount,
    accountUsers,
  } = useAccountsTableActions();
  const {
    count,
    results,
  } = data || {};
  const formattedAccounts = formatAccounts(results);
  useEffect(()=> {
    if(count) setCountState(count);
  }, [count]);
  const filtersList = [
    {
      name: 'dates',
      title: 'Dates',
      popup: DatesFilterPopup,
      value: {
        startDate: query.startDate,
        endDate: query.endDate
      },
      onChange: pagination.setFilters,
    },
    {
      name: 'isActive',
      title: 'Status',
      popup: AccountStatusFilterPopup,
      value: query.isActive,
      onChange: pagination.setFilters,
    },
    {
      name: 'showDeleted',
      title: 'Show Deleted',
      popup: ShowDeletedFilterPopup,
      value: query.showDeleted,
      onChange: pagination.setFilters,
    }
  ]

  const actions:TableActionType<FormattedAccount>[] = [
    {
      label: 'Pause',
      onClick: pauseAccount,
      condition: (row) => row.isActive,
    },
    {
      label: 'Resume',
      onClick: resumeAccount,
      condition: (row) => !row.isActive,
    },
    {
      label: 'Users',
      onClick: accountUsers,
      condition: (row) => row.isActive,
    },
    {
      label: 'Impersonate',
      onClick: impersonateAccount,
      condition: (row) => row.isActive,
    },
  ];
  
  return {
    count: countState,
    formattedAccounts,
    isLoading,
    error,
    pagination,
    filtersList,
    actions,
  };
};