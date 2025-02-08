import { request } from "@shared/utils";
import { API, METHODS } from "@shared/constants";
import { IGuestModel } from "@shared/interfaces/Guest.interface";

export default {
  getUserDetails: (): Promise<IGuestModel> => request(METHODS.GET, API.USER.GET_USER_INFO)(),
};
