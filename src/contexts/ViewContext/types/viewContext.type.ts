import { DialogProps } from "@mui/material";

export type ShowNotificationParams = {
  content: string | React.ReactNode;
  severity: "error" | "info" | "success" | "warning";
  duration?: number;
  onClose?: () => void;
}

export type ShowModalParams = {
  content?: string | React.ReactNode;
  title: string;
  onClose?: () => void;
  fullWidth?: boolean;
  maxWidth?: DialogProps['maxWidth'];
  Component?: React.JSXElementConstructor<any>;
}

export type ViewContextType = {
  notification: {
    show: (params: ShowNotificationParams) => void;
    hide: () => void;
  };
  modal: {
    show: (params: ShowModalParams) => void;
    hide: () => void;
  };
}
