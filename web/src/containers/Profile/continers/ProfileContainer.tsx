import { Flex } from "@chakra-ui/react";
import { FC } from "react";

import Profile from "../components/Profile";

const ProfileContainer: FC = () => {
  return (
    <Flex w="100%" h="100%" flexDir="row" alignItems="center" justifyContent="center">
      <Profile />
    </Flex>
  );
};

export default ProfileContainer;
