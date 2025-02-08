import { Box, Flex } from "@chakra-ui/react";
import React, { FC } from "react";

export interface AddSelectOptionProps {
  onClick?: () => void;
  buttonText?: string | React.ReactNode;
  hintText?: React.ReactNode | string;
}

const AddSelectOption: FC<AddSelectOptionProps> = (props) => {
  const { onClick, buttonText = "+ Add", hintText } = props;

  return (
    <Flex
      mt="2px"
      cursor="default"
      boxShadow="0px -3px 4px 0px #1F50500D"
      p="15px"
      alignItems="center"
      justifyContent="space-between"
      onClick={onClick}
    >
      <Box textStyle="textHint">{hintText}</Box>
      <Box cursor="pointer" color="secondaryDark" fontSize="16px" fontWeight="600">
        {buttonText}
      </Box>
    </Flex>
  );
};

export default AddSelectOption;
