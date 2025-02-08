import authApi from "./api";

import { MutationOptions } from "@shared/interfaces/Api.interface";
import {
  IActivateRequestDto,
  IChangePasswordRequestDto,
  ILoginRequestDto,
  ILoginResponseDto,
  IRegistrationRequestDto,
  IRegistrationResponseDto,
  IRestoreRequestDto,
} from "@containers/Auth/interfaces";
import { useMutation } from "@shared/api";

export enum AuthMutation {
  login = "login",
  registration = "registration",
  forgotPassword = "forgotPassword",
}

export const useLoginUserMutation = (options?: MutationOptions<ILoginResponseDto, ILoginRequestDto>) =>
  useMutation({
    mutationKey: [AuthMutation.login],
    mutationFn: (params) => authApi.login(params).then((response) => response),
    ...options,
  });

export const useRegistrationMutation = (options?: MutationOptions<IRegistrationResponseDto, IRegistrationRequestDto>) =>
  useMutation({
    mutationKey: [AuthMutation.registration],
    mutationFn: (params) => authApi.registration(params).then((response) => response),
    ...options,
  });

export const useForgotPasswordMutation = (options?: MutationOptions<void, IRestoreRequestDto>) =>
  useMutation({
    mutationKey: [AuthMutation.forgotPassword],
    mutationFn: (params) => authApi.forgotPassword(params),
    ...options,
  });

export const useChangePasswordMutation = (options?: MutationOptions<void, IChangePasswordRequestDto>) =>
  useMutation({
    mutationKey: [AuthMutation.forgotPassword],
    mutationFn: (params) => authApi.setPassword(params),
    ...options,
  });

export const useActivateMutation = (options?: MutationOptions<void, IActivateRequestDto>) =>
  useMutation({
    mutationKey: [AuthMutation.forgotPassword],
    mutationFn: (params) => authApi.activate(params),
    ...options,
  });
