
import React, { useMemo } from 'react'
import NavBar from '../components/AppBar'
import SideDrawer from '../components/SideDrawer'
import { Box } from '@mui/material'
import { menuList } from '../constants/menuList'
import { useNavigate } from 'react-router'
import { IGetAuthResponse } from '../../lib/responses/getAuth'

type AppLayoutProps = {
  children: React.ReactNode;
  currentPage: string;
  isAdmin?: boolean;
  isMaster?: boolean;
  user?: IGetAuthResponse;
  onChangeColorMode: (colorMode: 'light' | 'dark') => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({children, currentPage, isAdmin, isMaster, user, onChangeColorMode}) => {
  const navigate = useNavigate()
  const goTo = (url: string)=> () => {
    navigate(url);
  }
  const menuItems = useMemo(() => {
    if(isMaster) {
      return {...menuList};
    }
    if(isAdmin) {
      return { 
        top: menuList.top.filter(item => !item.masterOnly),
        bottom: menuList.bottom.filter(item => !item.masterOnly),
      };
    }
    if(user?.isActive) {
      return {
        top: menuList.top.filter(item => !item.adminOnly && !item.masterOnly),
        bottom: menuList.bottom.filter(item => !item.adminOnly && !item.masterOnly),
      }
    }
    return {
      top: menuList.top.filter(item => !item.adminOnly && !item.activeOnly && !item.masterOnly),
      bottom: menuList.bottom.filter(item => !item.adminOnly && !item.activeOnly && !item.masterOnly),
    };
  }, [isAdmin, isMaster, user]);
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