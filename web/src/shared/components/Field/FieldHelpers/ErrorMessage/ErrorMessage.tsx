import { FC } from "react";
import { Text } from "@chakra-ui/react";

interface ErrorMessageProps {
  isTouched?: boolean;
  isDisabledDefaultErrorHeight?: boolean;
  error?: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ isTouched, error, isDisabledDefaultErrorHeight }) => {
  return isTouched && error ? (
    <Text h="16px" color="errorColor" mt="1" fontSize="12px">
      {error}
    </Text>
  ) : !isDisabledDefaultErrorHeight ? (
    <Text h="16px" mt="1" />
  ) : null;
};
