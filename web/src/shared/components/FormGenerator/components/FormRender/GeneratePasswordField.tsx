import React from "react";
import { InputProps as ChakraInputProps } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { useField } from "formik";

import { IRenderField, IGenerateRenderField, FieldItemType } from "../../interfaces";

import { ErrorMessage, Input } from "@shared/components";

export interface PasswordFieldItem extends IRenderField {
  type: FieldItemType.PASSWORD;
  label: string;
  isShowPasswordIcon: boolean;
  inputLeftElement?: ChakraInputProps["children"];
  disabled?: boolean;
  placeholder?: string;
}

export const GeneratePasswordField: IGenerateRenderField<PasswordFieldItem> = ({ name, disabled, type }) => {
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
      <ErrorMessage isTouched={meta.touched} error={meta.error?.toString()} />
    </Box>
  );
};
