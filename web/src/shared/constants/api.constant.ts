import config from "../../config";

export default {
  AUTH: {
    LOGIN: `${config.baseApiUrl}auth/login`,
    REGISTER: `${config.baseApiUrl}auth/register`,
    FORGOT_PASSWORD: `${config.baseApiUrl}auth/forgotPassword`,
    SET_PASSWORD: `${config.baseApiUrl}auth/setPassword`,
    REGISTRATION: `${config.baseApiUrl}auth/registration`,
    ACTIVATE: `${config.baseApiUrl}auth/activate`,
  },
  USER: {
    GET_USER_INFO: `${config.baseApiUrl}user/profile`,
  },
};
