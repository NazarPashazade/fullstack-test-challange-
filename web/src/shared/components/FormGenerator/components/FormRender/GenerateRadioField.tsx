import React from "react";
import { useField } from "formik";

import { IRenderField, IGenerateRenderField, FieldItemType } from "../../interfaces";

import { IOption } from "@shared/interfaces";
import { ErrorMessage, Radio } from "@shared/components";

export interface RadioFieldItem extends IRenderField {
  type: FieldItemType.RADIO;
  options: IOption<string>[];
  label?: string;
  optionsDirection?: "row" | "column";
  disabled?: boolean;
}

export const GenerateRadioField: IGenerateRenderField<RadioFieldItem> = (props) => {
  const { label, name, options, optionsDirection, disabled } = props;

  const [, meta] = useField(name);

  const hasError = !props.formikProps.submitCount && meta.error;

  return (
    <div key={name} id={name}>
      <Radio
        label={label}
        options={options}
        name={name}
        optionsDirection={optionsDirection}
        disabled={disabled}
        hasError={Boolean(hasError)}
      />
      <ErrorMessage isTouched={!!props.formikProps.submitCount} error={meta.error?.toString()} />
    </div>
  );
};
