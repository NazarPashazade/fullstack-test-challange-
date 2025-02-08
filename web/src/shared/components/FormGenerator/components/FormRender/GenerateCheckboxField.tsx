import React from "react";
import { useField } from "formik";

import { IRenderField, IGenerateRenderField, FieldItemType } from "../../interfaces";

import { CheckboxInput, ErrorMessage } from "@shared/components";

export interface CheckBoxFieldItem extends IRenderField {
  type: FieldItemType.CHECKBOX;
  label?: string | React.ReactNode;
  disabled?: boolean;
}

export const GenerateCheckBoxField: IGenerateRenderField<CheckBoxFieldItem> = ({ name, disabled, ...props }) => {
  const [{ onBlur }, meta] = useField(name);

  return (
    <div key={name}>
      <CheckboxInput name={name} onBlur={onBlur} isDisabled={disabled} {...props} />
      <ErrorMessage isTouched={meta.touched} error={meta.error?.toString()} />
    </div>
  );
};
