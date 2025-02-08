import { AxiosError } from "axios";
import { QueryKey, UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

export interface ErrorResponse {
  message: string;
  status: number;
  errors?: { [key: string]: string | string[] };
}

interface IExtendedOptions {
  toggleGlobalLoader?: boolean;
  enableErrorHandling?: boolean;
}

export type IQueryOptions<TQueryFnData, TData, TQueryKey extends QueryKey = string[]> = UseQueryOptions<
  TQueryFnData,
  AxiosError<ErrorResponse>,
  TData,
  TQueryKey
> &
  IExtendedOptions;

export type QueryOptions<TQueryFnData, TData = TQueryFnData, TQueryKey extends QueryKey = string[]> = Omit<
  IQueryOptions<TQueryFnData, TData, TQueryKey>,
  "queryKey" | "queryFn" | "initialData"
>;

export type MutationOptions<TData, TParams> = UseMutationOptions<TData, AxiosError<ErrorResponse>, TParams> &
  IExtendedOptions;
