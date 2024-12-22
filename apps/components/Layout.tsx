import { useToast, View } from "native-base";
import React, { PropsWithChildren, useEffect } from "react";
import { useAppContext } from "../context/app.context";
import ToastAlert from "./toast";

type ToastAlertProps = {
  id: string;
  status?: "success" | "error" | "info" | "warning";
  variant: "solid" | "subtle" | "left-accent" | "top-accent" | "outline";
  title: string;
  description?: string;
  isClosable?: boolean;
  toast: ReturnType<typeof useToast>;
};

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { appAlert, setAppAlert } = useAppContext();
  const toast = useToast();

  const showToast = (type: "success" | "error" | "warning") => {
    const toastConfig: Record<
      typeof type,
      Omit<ToastAlertProps, "id" | "toast">
    > = {
      success: {
        title: "Action Successful",
        description: "Your action was completed successfully.",
        status: "info",
        variant: "solid",
        isClosable: true,
      },
      error: {
        title: "Action Failed",
        description: `Something went wrong!!! ${appAlert.message}`,
        status: "error",
        variant: "subtle",
        isClosable: true,
      },
      warning: {
        title: "Warning!",
        description: "Please check your input.",
        status: "warning",
        variant: "left-accent",
        isClosable: true,
      },
    };

    const config = toastConfig[type];

    toast.show({
      render: ({ id }) => <ToastAlert id={id} toast={toast} {...config} />,
      onCloseComplete: () => {
        setAppAlert({
          alertType: undefined,
          message: "",
          isDisplayAlert: false,
        });
      },
    });
  };

  useEffect(() => {
    if (appAlert.alertType === "error") {
      showToast("error");
    }
    if (appAlert.alertType === "success") {
      showToast("success");
    }
    if (appAlert.alertType === "warning") {
      showToast("warning");
    }
  }, [appAlert]);

  return (
    <View flex={1} px={5} backgroundColor={"white"}>
      {children}
    </View>
  );
};

export default Layout;
