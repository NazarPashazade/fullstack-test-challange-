import React, { FC, memo } from "react";
import { Field } from "formik";
import {
  FormControl,
  FormLabel,
  Textarea as TextareaChakra,
  TextareaProps as ChakraTextareaProps,
} from "@chakra-ui/react";

interface TextareaProps extends ChakraTextareaProps {
  label?: string;
  hasError?: boolean;
}

const Textarea: FC<TextareaProps> = memo(({ label, hasError, ...textareaProps }) => {
  return (
    <FormControl mt={4}>
      {label && (
        <FormLabel
          position="absolute"
          height="fit-content"
          left="10px"
          top="-10px"
          p="0 8px"
          bg="white"
          textStyle="label"
          fontSize="12px"
          zIndex={10}
          color={hasError ? "errorColor" : undefined}
        >
          {label}
        </FormLabel>
      )}
      <Field
        as={TextareaChakra}
        {...textareaProps}
        _hover={{ borderColor: hasError ? "errorColor" : undefined }}
        _focusVisible={{ boxShadow: "transparent", borderColor: hasError ? "errorColor" : undefined }}
        borderColor={hasError ? "errorColor" : undefined}
        variant="outline"
        bg="white"
        borderRadius="base"
      />
    </FormControl>
  );
});

export default Textarea;
