import React, { FC } from "react";
import { components, MenuListProps } from "chakra-react-select";
import { Box } from "@chakra-ui/react";

import { AddSelectOption } from "../AddSelectOption";

interface CustomMenuListProps {
  onAddClick?: () => void;
  baseProps: MenuListProps;
  addText?: string | React.ReactNode;
  hintText?: React.ReactNode;
  footerComponent?: React.ReactNode;
}

const CustomMenuList: FC<CustomMenuListProps> = (props) => {
  const { onAddClick, addText, baseProps, hintText, footerComponent } = props;

  return (
    <Box bg="white" borderColor="inputBorderColor" borderWidth="1px" borderRadius="8px">
      <components.MenuList {...baseProps}>
        <Box>{baseProps.children}</Box>
      </components.MenuList>
      {footerComponent || <AddSelectOption hintText={hintText} onClick={onAddClick} buttonText={addText} />}
    </Box>
  );
};

export default CustomMenuList;
