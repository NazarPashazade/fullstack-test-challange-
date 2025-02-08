import { Box, Text } from "@chakra-ui/react";
import React from "react";

import { useCurrentUserQuery } from "@shared/api/user.api";

const Profile: React.FC = () => {

  const { data, isError, isLoading } = useCurrentUserQuery();

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (isError) {
    return <Box>Error...</Box>;
  }

  return (
    <Box padding={8}>
      <Text fontSize="2xl" fontWeight="bold">
        Profile
      </Text>
      <Box mt={4}>
        <Text>Name: {data?.name}</Text>
        <Text>Email: {data?.email}</Text>
      </Box>
    </Box>
  );
};

export default Profile;
