import React, { useCallback, useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { useField } from "formik";

import { IRenderField, IGenerateRenderField, FieldItemType } from "../../interfaces";

import { ErrorMessage, Select } from "@shared/components";
import { IOption } from "@shared/interfaces";

export interface SelectFieldItem extends IRenderField {
  type: FieldItemType.SELECT;
  label?: string;
  options: IOption<string>[];
  isClearable?: boolean;
  placeholder?: string;
}

export const GenerateSelectField: IGenerateRenderField<SelectFieldItem> = ({
  options,
  name,
  label,
  isClearable,
  placeholder,
}) => {
  const [{ onChange }, meta, { setTouched }] = useField(name);

  const hasError = meta.error && meta.touched;

  const currentOptionValue = useMemo(() => {
    return options.find((option) => option.value === meta.value) || null;
  }, [options, meta.value]);

  const handleChange = useCallback(
    (option: IOption<string> | null) => {
      const value = option?.value || null;
      onChange({ target: { name, value } });
    },
    [name, onChange],
  );

  return (
    <Box w="100%" key={name}>
      <Select
        label={label}
        name={name}
        options={options}
        value={currentOptionValue}
        onChange={handleChange}
        isClearable={isClearable}
        placeholder={placeholder}
        onBlur={() => setTouched(true)}
        hasError={Boolean(hasError)}
      />
      <ErrorMessage isTouched={meta.touched} error={meta.error?.toString()} />
    </Box>
  );
};
