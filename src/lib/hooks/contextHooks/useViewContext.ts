import { useContext } from "react";
import { ViewContext } from "../../../contexts/ViewContext";
import { ViewContextType } from "../../../contexts/ViewContext/types/viewContext.type";

export const useViewContext = (): ViewContextType => useContext(ViewContext);