import { Box, Flex } from "@chakra-ui/react";
import { lazy } from "react";
import { RouteObject, useRoutes } from "react-router-dom";

import { ProfileContainer } from "@containers/Profile/continers";
import { Loadable, NotFound } from "@shared/components";
import { NamesOfParentRoutes } from "@shared/constants";
import { AuthGuard, GuestGuard } from "@shared/guards";

const ApplicationContainer = Loadable(lazy(() => import("@containers/App/ApplicationContainer")));
const AuthContainer = Loadable(lazy(() => import("@containers/Auth/containers/AuthContainer/AuthContainer")));

const routes: RouteObject[] = [
  {
    path: `${NamesOfParentRoutes.AUTH}/*`,
    element: (
      <GuestGuard>
        <AuthContainer />
      </GuestGuard>
    ),
  },
  {
    path: `${NamesOfParentRoutes.APP}*`,
    element: (
      <AuthGuard>
        <ApplicationContainer />
      </AuthGuard>
    ),
  },

  {
    path: `${NamesOfParentRoutes.PROFILE}*`,
    element: (
      <AuthGuard>
        <ProfileContainer />
      </AuthGuard>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const App = () => {
  const content = useRoutes(routes);

  return (
    <Box className="App">
      <Flex w="100%" h="100%">
        {content}
      </Flex>
    </Box>
  );
};

export default App;
