import React, { useEffect, useMemo } from 'react'
import { useAuth } from '../../lib/hooks/useAuth';
import { LoginDTO } from '../../lib/dto/LoginDTO';
import { initialContextValue } from './constants/initialValues';
import { IGetAuthResponse } from '../../lib/responses/getAuth';
import { SignUpFormType } from '../../lib/types/forms/SignUpForm';
import { LogInFormType } from '../../lib/types/forms/LoginForm';
import { Role } from '../../lib/enums/role.enum';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import { APIBaseError } from '../../lib/types/errors/apiBaseError.type';

export type AuthContextType = {
  user?: IGetAuthResponse;
  isAdmin?: boolean;
  isMaster?: boolean;
  login: (data: LogInFormType) => Promise<void>;
  signUp: (data: SignUpFormType) => Promise<void>;
  logout: () => void;
  isLoginPending?: boolean;
  loginError?: AxiosError<APIBaseError, any> | null;
  isSignUpPending?: boolean;
  signUpError?: AxiosError<APIBaseError, any> | null;
}

export const AuthContext = React.createContext<AuthContextType>(initialContextValue);

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
    invalidateAllQueries,
  } = useAuth();
  const login = async (data: LoginDTO) => {
    loginMutation.mutate(data);
  }
  const signUp = async (data: SignUpFormType) => {
    signUpMutation.mutate(data);
  }
  const logout = () => {
    localStorage.removeItem('token');
    invalidateAllQueries();
  }
  useEffect(()=>{
    if(error) {
      navigate('/login')
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
      isLoginPending: loginMutation.isPending,
      loginError: loginMutation.error,
      isSignUpPending: signUpMutation.isPending,
      signUpError: signUpMutation.error,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider