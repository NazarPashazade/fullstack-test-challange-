import React from "react";
import { useField } from "formik";
import { Box } from "@chakra-ui/react";

import { IRenderField, IGenerateRenderField, FieldItemType } from "../../interfaces";

import { ErrorMessage, Textarea } from "@shared/components";

export interface TextAreaFieldItem extends IRenderField {
  type: FieldItemType.TEXTAREA;
  label: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
}

export const GenerateTextAreaField: IGenerateRenderField<TextAreaFieldItem> = ({ name, disabled }) => {
  const [{ onBlur }, meta] = useField(name);

  return (
    <Box key={name} id={name}>
      <Textarea
        name={name}
        value={meta.value}
        isDisabled={disabled}
        hasError={Boolean(meta.touched && meta.error)}
        onBlur={onBlur}
      />
      <ErrorMessage isTouched={meta.touched} error={meta.error?.toString()} />
    </Box>
  );
};
