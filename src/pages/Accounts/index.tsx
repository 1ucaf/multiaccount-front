import { Box } from "@mui/material";
import Table from "../../components/Table";
import { useAccountsTable } from "./lib/hooks/useAccountsTable";
import { accountsHeaders } from "./lib/constants/headers";

const Accounts: React.FC = () => {
  const {
    count,
    formattedAccounts,
    isLoading,
    pagination,
    filtersList,
    actions,
  } = useAccountsTable();
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
        rows={formattedAccounts || []}
        loading={isLoading}
        headers={accountsHeaders}
        search={{
          onClickSearchButton: (term) => setSearch(term || ''),
          searchTerm: search,
        }}
        filter={{
          clearAllFilters: () => {
            setFilters({});
          },
          filtersList,
        }}
        pagination={{
          page: page,
          rowsPerPage: pageSize,
          totalRows: count || 0,
          onPageChange: (_, page) => {setPage(page)},
          onRowsPerPageChange: (e) => {
            setPageSize(parseInt(e.target.value))
            setPage(1);
          },
        }}
        actions={actions}
      />
    </Box>
  )
}

export default Accounts