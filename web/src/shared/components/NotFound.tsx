import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    height="100vh"
    textAlign="center"
  >
    <Heading mb={4}>404</Heading>
    <Text mb={4}>Oops! Page not found.</Text>
    <Button as={Link} to="/">
      Back Home
    </Button>
  </Box>
);

export default NotFound;
