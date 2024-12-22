import React from "react";
import {
  Button,
  useToast,
  Center,
  VStack,
  Alert,
  HStack,
  Text,
  IconButton,
  CloseIcon,
} from "native-base";

// Define the types for the toast props
type ToastAlertProps = {
  id: string;
  status?: "success" | "error" | "info" | "warning";
  variant: "solid" | "subtle" | "left-accent" | "top-accent" | "outline";
  title: string;
  description?: string;
  isClosable?: boolean;
  toast: ReturnType<typeof useToast>;
};

const ToastAlert: React.FC<ToastAlertProps> = ({
  id,
  status = "info",
  variant,
  title,
  description,
  isClosable = false,
  toast,
}) => {
  return (
    <Alert
      maxWidth="100%"
      alignSelf="center"
      flexDirection="row"
      m={5}
      status={status}
      variant={variant}
    >
      <VStack space={1} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text
              fontSize="md"
              fontWeight="medium"
              flexShrink={1}
              color={
                variant === "solid"
                  ? "lightText"
                  : variant !== "outline"
                  ? "darkText"
                  : undefined
              }
            >
              {title}
            </Text>
          </HStack>
          {isClosable && (
            <IconButton
              variant="unstyled"
              icon={<CloseIcon size="3" />}
              _icon={{
                color: variant === "solid" ? "lightText" : "darkText",
              }}
              onPress={() => toast.close(id)}
            />
          )}
        </HStack>
        {description && (
          <Text
            px="6"
            color={
              variant === "solid"
                ? "lightText"
                : variant !== "outline"
                ? "darkText"
                : undefined
            }
          >
            {description}
          </Text>
        )}
      </VStack>
    </Alert>
  );
};

export default ToastAlert;
