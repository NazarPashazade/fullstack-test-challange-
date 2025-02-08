import React, { FC } from "react";
import { Box } from "@chakra-ui/react";

import NoMatchesIcon from "@assets/files/icons/general/no-matches.svg";

interface EmptyStatePropsInterface {
  title: string;
}

const EmptyState: FC<EmptyStatePropsInterface> = (props) => {
  const { title } = props;
  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" width="100%" height="80%">
      <NoMatchesIcon />
      <Box textStyle="noMatchesTitle" mt="16px">
        {title}
      </Box>
    </Box>
  );
};

export default EmptyState;
