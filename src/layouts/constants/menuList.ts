import { AutoStories, Logout, Home, Group, ManageAccounts } from '@mui/icons-material'
import { MenuItem, MenuList } from '../types/MenuList'

export const menuList: MenuList = {
  top: [
    { label: 'Home', path: '/', Icon: Home, activeOnly: true },
    { label: 'Accounts', path: '/accounts', Icon: ManageAccounts, masterOnly: true, adminOnly: true, activeOnly: true },
    { label: 'Users', path: '/users', Icon: Group, adminOnly: true, activeOnly: true, permissions: 'users.get' },
    { label: 'Books', path: '/books', Icon: AutoStories, activeOnly: true, permissions: 'books.get' },
  ],
  bottom: [
    { label: 'Log Out', path: '/logout', Icon: Logout },
  ],
}

export const menuListMap: Record<string, MenuItem> = menuList.top.reduce((acc, item) => ({ ...acc, [item.path]: item }), {})