import { createContext } from "react";
import { initialContextValue } from "../constants/initialValues";
import { ViewContextType } from "../types/viewContext.type";

const ViewContext = createContext<ViewContextType>(initialContextValue);

export default ViewContext;