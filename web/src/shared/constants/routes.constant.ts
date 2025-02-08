export const NamesOfParentRoutes = {
  AUTH: "/auth",
  APP: "/",
};

export const NameOfRoutes = {
  APP: "/",
  AUTH_LOGIN: "/auth/login",
  AUTH_REGISTRATION: "/auth/signup",
  AUTH_FORGOT_PASSWORD: "/auth/restore",
  AUTH_CHANGE_PASSWORD: "/auth/change",
};

export const NameOfChildRoutes = {
  AUTH: {
    LOGIN: "/login",
    FORGOT_PASSWORD: "/restore",
    CHANGE_PASSWORD: "/change",
    REGISTRATION: "/signup",
  },
  DEFAULT_REDIRECT: "/*",
};
