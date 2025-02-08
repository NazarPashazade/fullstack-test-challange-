import React, { FC, memo } from "react";
import { RadioGroup, Radio as Option, Stack, Text, Flex } from "@chakra-ui/react";

import { IOption } from "@shared/interfaces";

export interface RadioInputProps {
  name: string;
  options: IOption<string>[];
  optionsDirection?: "row" | "column";
  disabled?: boolean;
  hasError?: boolean;
  label?: string;
}

export const Radio: FC<RadioInputProps> = memo((props) => {
  const { name, label, options, disabled, hasError, optionsDirection = "row" } = props;

  return (
    <RadioGroup isDisabled={disabled} colorScheme="red" name={name}>
      {label ? (
        <Text>
          <Text as="span" textStyle="text" mr="5px" color={hasError ? "errorColor" : undefined}>
            {label}
          </Text>
        </Text>
      ) : null}
      <Stack
        mt={label ? "5px" : undefined}
        direction={optionsDirection}
        gap={optionsDirection === "row" ? "0 25px" : "10px 0"}
      >
        {options.map((option) => (
          <Option variant="primary" key={option.value} value={option.value}>
            <Flex textStyle="text">{option.label}</Flex>
          </Option>
        ))}
      </Stack>
    </RadioGroup>
  );
});
