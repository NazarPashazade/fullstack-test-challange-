import React, { lazy } from "react";
import { useRoutes, RouteObject } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

import { NamesOfParentRoutes } from "@shared/constants";
import { Loadable, NotFound } from "@shared/components";
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
