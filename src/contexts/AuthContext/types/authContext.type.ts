import { AxiosError } from "axios";
import { ChangePasswordDTO } from "../../../lib/dto/ChangePasswordDTO";
import { IGetAuthResponse } from "../../../lib/responses/getAuth";
import { LogInFormType } from "../../../lib/types/forms/LoginForm";
import { SignUpFormType } from "../../../lib/types/forms/SignUpForm";
import { APIBaseError } from "../../../lib/types/errors/apiBaseError.type";

export type AuthContextType = {
  user?: IGetAuthResponse;
  isAdmin?: boolean;
  isMaster?: boolean;
  login: (data: LogInFormType) => Promise<void>;
  signUp: (data: SignUpFormType) => Promise<void>;
  logout: () => void;
  changePassword: (data: ChangePasswordDTO) => Promise<void>;
  isLoginPending?: boolean;
  loginError?: AxiosError<APIBaseError, any> | null;
  isSignUpPending?: boolean;
  signUpError?: AxiosError<APIBaseError, any> | null;
  isChangePasswordPending?: boolean;
  isChangePasswordSuccess?: boolean;
  changePasswordError?: AxiosError<APIBaseError, any> | null;
}