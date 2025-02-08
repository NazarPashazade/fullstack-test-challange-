import { createContext, FC, PropsWithChildren, useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { GuestQuery, useCurrentUserQuery } from "../../api/user.api";
import tokenHandler from "../../utils/tokenHandler";
import { useDidUpdate } from "../../hooks";
import { IAuthInterface } from "./interfaces/Auth.interface";

export const AuthContext = createContext<IAuthInterface | null>(null);

// todo : fetch user after user profile is implemented

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(tokenHandler.get() || null);

  /*  const { data: guest } = useCurrentUserQuery({
    enabled: !!token,
  });*/

  const handleLogin = useCallback((token: string) => {
    tokenHandler.set(token);
    setToken(token);
    /*   queryClient.invalidateQueries({
        queryKey: [GuestQuery.getMyProfile],
      });*/
  }, []);

  const handleLogout = useCallback(() => tokenHandler.remove(), []);

  const isAuthenticated = !!token;

  /*  useDidUpdate(() => {
    if (!token) {
      queryClient.resetQueries({ queryKey: [GuestQuery.getMyProfile] });
    }
  }, [token]);*/

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        onLogin: handleLogin,
        onLogout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
