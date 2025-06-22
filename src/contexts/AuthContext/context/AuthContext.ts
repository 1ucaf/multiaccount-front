import { createContext } from "react";
import { AuthContextType } from "../types/authContext.type";
import { initialContextValue } from "../constants/initialValues";

const AuthContext = createContext<AuthContextType>(initialContextValue);

export default AuthContext;