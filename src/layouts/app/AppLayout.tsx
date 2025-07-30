
import React, { useMemo } from 'react'
import NavBar from '../components/AppBar'
import SideDrawer from '../components/SideDrawer'
import { Box } from '@mui/material'
import { menuList } from '../constants/menuList'
import { useNavigate } from 'react-router'
import { IGetAuthResponse } from '../../lib/responses/getAuth'
import { useCurrentUserPermissions } from '../../lib/hooks/useCurrentUserPermissions'

type AppLayoutProps = {
  children: React.ReactNode;
  currentPage: string;
  isAdmin?: boolean;
  isMaster?: boolean;
  user?: IGetAuthResponse;
  onChangeColorMode: (colorMode: 'light' | 'dark') => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({children, currentPage, isAdmin, isMaster, user, onChangeColorMode}) => {
  const navigate = useNavigate();
  const { permissionsRawList } = useCurrentUserPermissions();
  const goTo = (url: string)=> () => {
    navigate(url);
  }
  const menuItems = useMemo(() => {
    if(!user) return { top: [], bottom: [] };
    if(isMaster) {
      return {...menuList};
    }
    if(isAdmin) {
      return {
        top: menuList.top
          .filter(item => !item.masterOnly)
          .filter(item =>
            Object.values(permissionsRawList).some(permission =>
              (!item.permissions || permission.includes(item.permissions))
            )
          ),
        bottom: menuList.bottom
          .filter(item => !item.masterOnly)
          .filter(item =>
            (
              !item.permissions ||
              Object.values(permissionsRawList).some(
                permission => permission.includes(item.permissions as string)
            ))
          ),
      };
    }
    if(user?.isActive) {
      return {
        top: menuList.top
          .filter(item => !item.adminOnly && !item.masterOnly)
          .filter(item =>
            (
              !item.permissions ||
              Object.values(permissionsRawList).some(
                permission => permission.includes(item.permissions as string)
            ))
          ),
        bottom: menuList.bottom
          .filter(item => !item.adminOnly && !item.masterOnly)
          .filter(item =>
            (
              !item.permissions ||
              Object.values(permissionsRawList).some(
                permission => permission.includes(item.permissions as string)
            ))
          ),
      }
    }
    return {
      top: menuList.top
        .filter(item => !item.adminOnly && !item.activeOnly && !item.masterOnly)
        .filter(item =>
          (
            !item.permissions ||
            Object.values(permissionsRawList).some(
              permission => permission.includes(item.permissions as string)
          ))
        ),
      bottom: menuList.bottom
        .filter(item => !item.adminOnly && !item.activeOnly && !item.masterOnly)
        .filter(item =>
          (
            !item.permissions ||
            Object.values(permissionsRawList).some(
              permission => permission.includes(item.permissions as string)
          ))
        ),
    };
  }, [isAdmin, isMaster, user, permissionsRawList]);
  return (
    <Box id='layout'>
      <NavBar currentPage={currentPage} goTo={goTo} user={user} onChangeColorMode={onChangeColorMode} />
      <SideDrawer menuList={menuItems}/>
      <Box sx={{ paddingTop: '65px', paddingLeft: '70px' }}>
        {children}
      </Box>
    </Box>
  )
}

export default AppLayout