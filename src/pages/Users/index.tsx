import React from 'react'
import { userHeaders } from './lib/constants/headers';
import { Box, Button } from '@mui/material';
import Table from '../../components/Table';
import { useUsersTable } from './lib/hooks/useUsersTable';
import CreateUserModal from './components/CreateUserModal';
import { useViewContext } from '../../lib/hooks/contextHooks/useViewContext';
import { useCurrentUserPermissions } from '../../lib/hooks/useCurrentUserPermissions';

type UsersProps = {}

const Users: React.FC<UsersProps> = () => {
  const { modal } = useViewContext();
  const { permissions: { users: { create: canCreate }} } = useCurrentUserPermissions();
  const {
    formattedUsers,
    isLoading,
    count,
    filtersList,
    pagination,
    actions,
  } = useUsersTable();

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
      { canCreate &&
        <Button
          sx={{
            mb: 2,
            alignSelf: 'flex-end',
          }}
          onClick={() => modal.show({
            title: 'Create User',
            Component: CreateUserModal,
          })}
          variant="contained"
        >
          Create User
        </Button>
      }
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
}

export default Users