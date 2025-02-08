import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

export interface AuthWrapperProps {
  title: string;
  children: React.ReactNode;
  backClick?: () => void;
}

const AuthWrapper: React.FC<AuthWrapperProps> = (props) => {
  const { title, children, backClick } = props;

  return (
    <Flex flexDir="column" minW="500px">
      {backClick && (
        <Flex align="center" onClick={backClick}>
          <Text>Back</Text>
        </Flex>
      )}
      <Text>{title}</Text>
      <Box>{children}</Box>
    </Flex>
  );
};

export default AuthWrapper;
