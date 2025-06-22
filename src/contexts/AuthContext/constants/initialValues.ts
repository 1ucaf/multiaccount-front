import { AuthContextType } from "../types/authContext.type";

export const initialContextValue: AuthContextType = {
  login: async () => {
    throw new Error("AuthContext: login function is not implemented.");
  },
  signUp: async () => {
    throw new Error("AuthContext: signUp function is not implemented.");
  },
  logout: async () => {
    throw new Error("AuthContext: logout function is not implemented.");
  },
  changePassword: async () => {
    throw new Error("AuthContext: changePassword function is not implemented.");
  },
};