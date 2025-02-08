import React, { ComponentType, FC, memo, useMemo } from "react";
import { GroupBase, MenuListProps, Select as ReactSelect } from "chakra-react-select";
import { FormControl, FormLabel } from "@chakra-ui/react";

import { IOption } from "@shared/interfaces";

export type TMenuWrapper = ComponentType<
  MenuListProps<IOption<string, unknown>, false, GroupBase<IOption<string, unknown>>>
>;

export interface SelectProps {
  options: IOption<string>[];
  value: IOption<string> | null;
  name: string;
  placeholder?: string;
  label?: string;
  isClearable?: boolean;
  noOptionsMessage?: string;
  hasError?: boolean;
  menuWrapper?: TMenuWrapper | undefined;
  onChange: (value: IOption<string> | null) => void;
  onInputChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Select: FC<SelectProps> = memo((props) => {
  const selectCompoments = useMemo(() => {
    return props.menuWrapper
      ? {
          MenuList: props.menuWrapper,
          IndicatorSeparator: () => null,
        }
      : undefined;
  }, [props.menuWrapper]);

  return (
    <FormControl w="100%">
      {props.label && (
        <FormLabel
          position="absolute"
          height="fit-content"
          left="10px"
          top="-10px"
          p="0 8px"
          bg="white"
          textStyle="label"
          fontSize="12px"
          zIndex={101}
          color={props.hasError ? "errorColor" : undefined}
        >
          {props.label}
        </FormLabel>
      )}
      <ReactSelect
        {...props}
        isSearchable={true}
        noOptionsMessage={() => props.noOptionsMessage || "No Options"}
        menuPlacement="auto"
        chakraStyles={{
          container: (provided) => ({
            ...provided,
            fontSize: "14px",
            cursor: "pointer",
            w: "100%",
          }),
          control: (provided) => ({
            ...provided,
            height: "48px",
            borderRadius: "base",
            borderColor: props.hasError ? "errorColor !important" : "inherit !important",
            boxShadow: "none !important",
            fontSize: "14px",
            background: "white",
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            background: "none",
          }),
          downChevron: (provided) => ({
            ...provided,
            fontSize: "14px",
            color: "gray.650",
          }),
          indicatorSeparator: (provided) => ({
            ...provided,
            fontSize: "14px",
            display: "none",
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#7E7E7E" : state.isFocused ? "base.white" : "transparent",
            fontSize: "14px",
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 202,
          }),
        }}
        components={selectCompoments}
      />
    </FormControl>
  );
});

export default Select;
