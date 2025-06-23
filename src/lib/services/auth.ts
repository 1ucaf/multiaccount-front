import axios from "axios"
import { LoginDTO } from "../dto/LoginDTO"
import { SignUpDTO } from "../dto/SignUpDTO";
import { ChangePasswordDTO } from "../dto/ChangePasswordDTO";

export const httpGETAuth = () =>  axios.get('/auth');

export const httpPOSTLogin = (body: LoginDTO) =>
  axios.post('/auth/login', body)

export const httpPOSTSignUp = (body: SignUpDTO) =>
  axios.post('/auth/signup', body)

export const httpPOSTChangePassword = (body: ChangePasswordDTO) =>
  axios.post('/auth/change-password', body)

export const httpImpersonateAccount = (accountId: string) =>
  axios.post(`/auth/impersonate/account/${accountId}`);

export const httpImpersonateUser = (userId: string) =>
  axios.post(`/auth/impersonate/user/${userId}`);