import React from "react";
import { InputProps as ChakraInputProps } from "@chakra-ui/react";
import { useField } from "formik";
import { Box } from "@chakra-ui/react";

import { IRenderField, IGenerateRenderField, FieldItemType } from "../../interfaces";

import { ErrorMessage, Input } from "@shared/components";

export interface TextFieldItem extends IRenderField {
  type: FieldItemType.TEXT;
  label: string;
  inputLeftElement?: ChakraInputProps["children"];
  inputRightElement?: ChakraInputProps["children"];
  disabled?: boolean;
  placeholder?: string;
}

export const GenerateTextField: IGenerateRenderField<TextFieldItem> = ({ name, disabled, type }) => {
  const [{ onBlur }, meta] = useField(name);
  return (
    <Box id={name}>
      <Input
        isDisabled={disabled}
        onBlur={onBlur}
        hasError={Boolean(meta.error && meta.touched)}
        name={name}
        type={type}
      />
      <ErrorMessage isTouched={meta.touched} error={meta.error} />
    </Box>
  );
};
