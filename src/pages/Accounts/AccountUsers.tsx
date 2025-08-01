import { Box } from "@mui/material";
import Table from "../../components/Table";
import { userHeaders } from "../Users/lib/constants/headers";
import { useParams } from "react-router";
import { useAccountUsersTable } from "./lib/hooks/useAccountUsersTable";

const AccountUsers = () => {
  const { accountId } = useParams();
  const {
    formattedUsers,
    isLoading,
    count,
    filtersList,
    pagination,
    actions,
  } = useAccountUsersTable(accountId as string);

  const {
    page,
    setPage,
    pageSize,
    search,
    setPageSize,
    setSearch,
    setFilters,
  } = pagination;
  return (
    <Box padding={4} display={'flex'} flexDirection={'column'}>
      <Table
        headers={userHeaders}
        rows={formattedUsers}
        loading={isLoading}
        filter={{ filtersList, clearAllFilters: () => setFilters({}) }}
        search={{
          onClickSearchButton: (term) => setSearch(term || ''),
          searchTerm: search,
        }}
        pagination={{
          page: page,
          rowsPerPage: pageSize,
          totalRows: count || 0,
          onPageChange: (_, page) => {setPage(page + 1)},
          onRowsPerPageChange: (e) => {
            setPageSize(parseInt(e.target.value))
            setPage(0);
          },
        }}
        actions={actions}
      />
    </Box>
  )
};

export default AccountUsers;