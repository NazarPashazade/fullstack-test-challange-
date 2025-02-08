import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

import { prepareErrorResponsePayload } from "@shared/utils";

const useToggleErrorToast = (enableErrorHandling: boolean, error: Error | null) => {
  const toast = useToast();

  useEffect(() => {
    if (enableErrorHandling && error) {
      const { message, customMessageText, isCustomMessage, code } = prepareErrorResponsePayload(error);
      console.log(message, customMessageText, isCustomMessage, code);
      toast({
        title: "Error",
        description: (isCustomMessage ? customMessageText : message) as string,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }, [enableErrorHandling, error, toast]);
};

export default useToggleErrorToast;
