import {
  IChangePasswordRequestDto,
  ILoginRequestDto,
  IRestoreRequestDto,
  IRegistrationRequestDto,
  IActivateRequestDto,
  ILoginResponseDto,
  IRegistrationResponseDto,
} from "../interfaces";

import { request } from "@shared/utils";
import { API, METHODS } from "@shared/constants";

export default {
  login: (payload: ILoginRequestDto): Promise<ILoginResponseDto> => request(METHODS.POST, API.AUTH.LOGIN)(payload),
  forgotPassword: (payload: IRestoreRequestDto) => request(METHODS.POST, API.AUTH.FORGOT_PASSWORD)(payload),
  setPassword: (payload: IChangePasswordRequestDto) => request(METHODS.POST, API.AUTH.SET_PASSWORD)(payload),
  registration: (payload: IRegistrationRequestDto): Promise<IRegistrationResponseDto> =>
    request(METHODS.POST, API.AUTH.REGISTRATION)(payload),
  activate: (payload: IActivateRequestDto) => request(METHODS.POST, API.AUTH.ACTIVATE)(payload),
};
