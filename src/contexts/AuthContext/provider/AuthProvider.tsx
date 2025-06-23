import React, { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router';
import AuthContext from '../context/AuthContext';
import { useAuth } from '../../../lib/hooks/useAuth';
import { LoginDTO } from '../../../lib/dto/LoginDTO';
import { ChangePasswordDTO } from '../../../lib/dto/ChangePasswordDTO';
import { SignUpFormType } from '../../../lib/types/forms/SignUpForm';
import { Role } from '../../../lib/enums/role.enum';

type AuthProviderProps = {
  children: React.ReactNode;
}
const AuthProvider: React.FC<AuthProviderProps> = ({
  children
}) => {
  const navigate = useNavigate();
  const {
    error,
    user,
    loginMutation,
    signUpMutation,
    changePasswordMutation,
    impersonateAccountMutation,
    impersonateUserMutation,
    invalidateAllQueries,
  } = useAuth();
  useEffect(() => {
    if(user && !user.isActive) {
      navigate('/change-password');
    }
  }, [user])
  const login = async (data: LoginDTO) => {
    loginMutation.mutate(data);
  }
  const changePassword = async (data: ChangePasswordDTO) => {
    changePasswordMutation.mutate(data);
  }
  const signUp = async (data: SignUpFormType) => {
    signUpMutation.mutate(data);
  }
  const logout = () => {
    sessionStorage.removeItem('token');
    invalidateAllQueries();
    navigate('/login');
  }
  useEffect(()=>{
    if(error) {
      navigate('/login');
    };
  }, [error]);
  const isMaster = useMemo(() => user?.roles?.some(role => role === Role.MASTER), [user]);
  const isAdmin = useMemo(() => user?.roles?.some(role => (
    role === Role.ADMIN ||
    role === Role.OWNER ||
    role === Role.MASTER
  )), [user]);
  return (
    <AuthContext.Provider value={{
      user: error ? undefined : user,
      isAdmin,
      isMaster,
      login,
      signUp,
      logout,
      changePassword,
      isLoginPending: loginMutation.isPending,
      loginError: loginMutation.error,
      isSignUpPending: signUpMutation.isPending,
      signUpError: signUpMutation.error,
      isChangePasswordPending: changePasswordMutation.isPending,
      isChangePasswordSuccess: changePasswordMutation.isSuccess,
      changePasswordError: changePasswordMutation.error,
      impersonateAccountMutation,
      impersonateUserMutation,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider