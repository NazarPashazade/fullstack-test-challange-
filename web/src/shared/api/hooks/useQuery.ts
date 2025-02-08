import { QueryKey, useQuery as useTanstackQuery } from "@tanstack/react-query";

import useToggleLoader from "./useToggleLoader";
import useToggleErrorToast from "./useToggleErrorToast";

import { IQueryOptions } from "@shared/interfaces/Api.interface";
const useQuery = <TQueryFnData, TData, TQueryKey extends QueryKey = string[]>(
  options: IQueryOptions<TQueryFnData, TData, TQueryKey>,
) => {
  const { enableErrorHandling = true, toggleGlobalLoader = true, ...baseOptions } = options;

  const query = useTanstackQuery(baseOptions);

  useToggleLoader(toggleGlobalLoader, query.isLoading);
  useToggleErrorToast(enableErrorHandling, query.error);

  return query;
};

export default useQuery;
