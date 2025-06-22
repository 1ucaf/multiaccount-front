import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { AuthContextType } from "../../../contexts/AuthContext/types/authContext.type";

export const useAuthContext = (): AuthContextType => useContext(AuthContext);