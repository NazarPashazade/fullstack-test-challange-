import React, { lazy, FC } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import { Loadable } from "@shared/components";
import { NameOfChildRoutes, NameOfRoutes } from "@shared/constants";
import { GuestGuard } from "@shared/guards";

const LoginContainer = Loadable(lazy(() => import("../LoginContainer/LoginContainer")));
const RestoreContainer = Loadable(lazy(() => import("../RestoreContainer/RestoreContainer")));
const ChangePasswordContainer = Loadable(lazy(() => import("../ChangePasswordContainer/ChangePasswordContainer")));
const RegistrationContainer = Loadable(lazy(() => import("../RegistrationContainer/RegistrationContainer")));

const routes = [
  {
    path: `${NameOfChildRoutes.AUTH.LOGIN}`,
    default: true,
    element: (
      <GuestGuard>
        <LoginContainer />
      </GuestGuard>
    ),
  },
  {
    path: `${NameOfChildRoutes.AUTH.FORGOT_PASSWORD}`,
    element: (
      <GuestGuard>
        <RestoreContainer />
      </GuestGuard>
    ),
  },
  {
    path: `${NameOfChildRoutes.AUTH.CHANGE_PASSWORD}/:hash`,
    element: (
      <GuestGuard>
        <ChangePasswordContainer />
      </GuestGuard>
    ),
  },
  {
    path: `${NameOfChildRoutes.AUTH.REGISTRATION}`,
    element: (
      <GuestGuard>
        <RegistrationContainer />
      </GuestGuard>
    ),
  },
  {
    path: `/*`,
    element: <Navigate to={NameOfRoutes.AUTH_LOGIN} />,
  },
];

const AuthContainer: FC = () => {
  const content = useRoutes(routes);

  return (
    <Flex w="100%" h="100%" flexDir="row" alignItems="center" justifyContent="center">
      {content}
    </Flex>
  );
};

export default AuthContainer;
