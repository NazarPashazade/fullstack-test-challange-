import React, { FC, memo } from "react";
import { Checkbox, CheckboxProps as ChakraCheckboxProps, Flex, Box } from "@chakra-ui/react";

interface CheckboxProps extends ChakraCheckboxProps {
  label?: string | React.ReactNode;
}

export const CheckboxInput: FC<CheckboxProps> = memo((props) => {
  const { value, isDisabled, onChange, name, label } = props;

  return (
    <Flex alignItems="center">
      <Checkbox
        variant="selectOption"
        isChecked={!!value}
        disabled={isDisabled}
        onChange={onChange}
        padding={value ? "4px" : "5px"}
        border={value ? "1px solid" : ""}
        borderRadius="base"
        borderColor="secondary"
        name={name}
      ></Checkbox>
      <Box ml="5px">{label}</Box>
    </Flex>
  );
});
