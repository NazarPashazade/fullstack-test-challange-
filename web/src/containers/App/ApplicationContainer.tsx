import React, { FC } from "react";
import { Box } from "@chakra-ui/react";

import { useCurrentUserQuery } from "@shared/api/user.api";

const ApplicationContainer: FC = () => {
  const { data, isError, isLoading } = useCurrentUserQuery({
    enabled: false,
  });

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (isError) {
    return <Box>Error...</Box>;
  }

  return (
    <Box h="100%" display="flex">
      <Box p="16px" overflowY="scroll">
        content
        {data?.email}
      </Box>
    </Box>
  );
};

export default ApplicationContainer;
