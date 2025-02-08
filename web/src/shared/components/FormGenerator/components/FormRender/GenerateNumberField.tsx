import React from "react";
import { Box } from "@chakra-ui/react";
import { useField } from "formik";

import { IRenderField, IGenerateRenderField, FieldItemType } from "../../interfaces";

import { ErrorMessage, Input } from "@shared/components";

export interface NumberFieldItem extends IRenderField {
  type: FieldItemType.NUMBER;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
}

export const GenerateNumberField: IGenerateRenderField<NumberFieldItem> = (props) => {
  const {
    formikProps: { handleBlur, handleChange },
    name,
    placeholder,
    disabled,
    type,
    label,
    min,
    max,
  } = props;

  const [, meta] = useField(name);

  return (
    <Box id={name}>
      <Input
        type={type}
        label={label}
        name={name}
        hasError={Boolean(meta.error && meta.touched)}
        placeholder={placeholder}
        isDisabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
        value={meta.value}
        min={min}
        max={max}
      />
      <ErrorMessage isTouched={meta.touched} error={meta.error?.toString()} />
    </Box>
  );
};
