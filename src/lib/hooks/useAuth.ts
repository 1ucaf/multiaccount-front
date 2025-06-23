import { AxiosError, AxiosResponse } from "axios"
import { httpGETAuth, httpImpersonateAccount, httpImpersonateUser, httpPOSTChangePassword, httpPOSTLogin, httpPOSTSignUp } from "../services/auth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { IGetAuthResponse } from "../responses/getAuth"
import { LoginDTO } from "../dto/LoginDTO"
import { SignUpDTO } from "../dto/SignUpDTO"
import { useLocation, useNavigate } from "react-router"
import { APIBaseError } from "../types/errors/apiBaseError.type"
import { ChangePasswordDTO } from "../dto/ChangePasswordDTO"
import { useEffect, useState } from "react"

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [impersonating, setImpersonating] = useState(false);
  const onSuccessAuth = (token: string) => {
    sessionStorage.setItem('token', token);
    navigate('/');
  };
  const onSuccessImpersonate = (token: string) => {
    sessionStorage.setItem('token', token);
    navigate('/');
    setImpersonating(true);
  }

  useEffect(() => {
    if(location.pathname === '/' && impersonating) {
      invalidateAllQueries();
      setImpersonating(false);
    }
  }, [impersonating, location.pathname]);

  const queryClient = useQueryClient();
  const {
    data: response,
    isLoading,
    error,
  } = useQuery<AxiosResponse<IGetAuthResponse>, AxiosError<APIBaseError>>({
    queryKey: ['auth'],
    queryFn: httpGETAuth,
    staleTime: Infinity,
    retry: false,
    enabled: !!sessionStorage.getItem('token'),
  });
  const invalidateAllQueries = () => {
    queryClient.invalidateQueries();
    queryClient.removeQueries();
  };
  const invalidateAuth = () => {
    queryClient.invalidateQueries({
      queryKey: ['auth'],
      exact: true,
    });
  }
  const loginMutation = useMutation<AxiosResponse<any>, AxiosError<APIBaseError>, LoginDTO>({
    mutationFn: (data: LoginDTO) => httpPOSTLogin(data),
    onSuccess: (data) => {
      invalidateAuth();
      onSuccessAuth(data.data.token);
    },
  });
  const signUpMutation = useMutation<AxiosResponse<any>, AxiosError<APIBaseError>, SignUpDTO>({
    mutationFn: (data: SignUpDTO) => httpPOSTSignUp(data),
    onSuccess: (data) => {
      invalidateAuth();
      onSuccessAuth(data.data.token);
    },
  });
  const changePasswordMutation = useMutation<AxiosResponse<any>, AxiosError<APIBaseError>, ChangePasswordDTO>({
    mutationFn: (data: ChangePasswordDTO) => httpPOSTChangePassword(data),
    onSuccess: () => {
      navigate('/logout');
    },
  });
  const impersonateAccountMutation = useMutation<AxiosResponse<any>, AxiosError<APIBaseError>, string>({
    mutationFn: httpImpersonateAccount,
    onSuccess: (data) => {
      onSuccessImpersonate(data.data.token);
    },
  })
  const impersonateUserMutation = useMutation<AxiosResponse<any>, AxiosError<APIBaseError>, string>({
    mutationFn: httpImpersonateUser,
    onSuccess: (data) => {
      onSuccessImpersonate(data.data.token);
    },
  })
  return {
    user: response?.data,
    isLoading,
    error,
    loginMutation,
    signUpMutation,
    changePasswordMutation,
    impersonateAccountMutation,
    impersonateUserMutation,
    invalidateAuth,
    invalidateAllQueries,
  }
}