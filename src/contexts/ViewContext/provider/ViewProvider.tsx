import React, { useMemo, useState } from "react";
import { useLocation } from "react-router";
import { useAuthContext } from "../../../lib/hooks/contextHooks/useAuthContext";
import { menuListMap } from "../../../layouts/constants/menuList";
import Notification, { NotificationProps } from "../../../components/Notification";
import { ShowModalParams, ShowNotificationParams } from "../types/viewContext.type";
import AppLayout from "../../../layouts/app/AppLayout";
import BaseLayout from "../../../layouts/base/BaseLayout";
import ViewContext from "../context/ViewContext";
import Modal, { ModalProps } from "../../../components/Modal";

type ViewProviderProps = {
  children: React.ReactNode;
  onChangeColorMode: (colorMode: 'light' | 'dark') => void;
}
const ViewProvider: React.FC<ViewProviderProps> = ({ children, onChangeColorMode }) => {
  const { user, isAdmin, isMaster } = useAuthContext();
  const location = useLocation();
  const currentPage = useMemo(() => (menuListMap[location.pathname]?.label), [location]);

  const [notification, setNotification] = useState<NotificationProps>({
    open: false,
    content: "",
    severity: "info",
    onClose: () => {}
  });
  const [modal, setModal] = useState<ModalProps>({
    open: false,
    onClose: () => {},
    content: "",
    title: "",
    fullWidth: true,
    maxWidth: "sm",
  });

  const hideNotification = () => {
    setNotification(notification => ({ ...notification, open: false }));
  }

  const showNotification = (params: ShowNotificationParams) => {
    setNotification({ ...params, open: true, onClose: hideNotification });
  }

  const hideModal = () => {
    setModal(modal => ({ ...modal, open: false, content: null, Component: undefined }));
  }

  const showModal = (params: ShowModalParams) => {
    setModal(modal=>({ ...modal, ...params, open: true, onClose: hideModal }));
  }

  const Layout = useMemo(() => user ? AppLayout : BaseLayout, [user]);
  return (
    <ViewContext.Provider
      value={{
        notification: {
          show: showNotification,
          hide: hideNotification,
        },
        modal: {
          show: showModal,
          hide: hideModal,
        }
      }}
    >
      <Layout
        {...{ currentPage, isAdmin, user, isMaster, onChangeColorMode }}
      >
        {children}
        <Notification {...notification} />
        <Modal {...modal} />
      </Layout>
    </ViewContext.Provider>
  )
}

export default ViewProvider;

