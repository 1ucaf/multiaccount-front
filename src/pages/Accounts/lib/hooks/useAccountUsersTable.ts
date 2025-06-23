import { useEffect, useState } from "react";
import { usePagination } from "../../../../lib/hooks/usePagination";
import { DatesFilterPopup } from "../../../../components/CommonFiltersPopups/DateCreated";
import { ShowDeletedFilterPopup } from "../../../../components/CommonFiltersPopups/ShowDeleted";
import { formatUsers } from "../../../Users/lib/utils/formatUsers";
import { UserRolesFilterPopup } from "../../../Users/components/FiltersPopups/UserRoles";
import { UserStatusFilterPopup } from "../../../Users/components/FiltersPopups/Status";
import { useAccountUsers } from "../../../../lib/hooks/users/useAccountUsers";
import { FormattedUser } from "../../../Users/lib/types/FormattedUser";
import { TableActionType } from "../../../../components/Table/lib/types";
import { useAccountUsersTableActions } from "./useAccountsUsersTableActions";

export const useAccountUsersTable = (accountId: string) => {
  const pagination = usePagination();
  const [countState, setCountState] = useState(0);
  const { query } = pagination;
  const { data, isLoading, error } = useAccountUsers(query, accountId);
  const { impersonateUser } = useAccountUsersTableActions();
  const {
    count,
    results,
  } = data || {};
  const formattedUsers = formatUsers(results);
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
      name: 'role',
      title: 'Roles',
      popup: UserRolesFilterPopup,
      value: query.role,
      onChange: pagination.setFilters,
    },
    {
      name: 'isActive',
      title: 'Status',
      popup: UserStatusFilterPopup,
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
  const actions:TableActionType<FormattedUser>[] = [
    {
      label: 'Impersonate',
      onClick: impersonateUser,
      condition: (row) => row.isActive,
    },
  ]
  return {
    count: countState,
    formattedUsers,
    isLoading,
    error,
    pagination,
    filtersList,
    actions,
  }
}