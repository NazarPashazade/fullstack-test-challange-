import { useMutation as useTanstackMutation } from "@tanstack/react-query";

import useToggleLoader from "./useToggleLoader";
import useToggleErrorToast from "./useToggleErrorToast";

import { MutationOptions } from "@shared/interfaces/Api.interface";

const useMutation = <TData, TParams>(options: MutationOptions<TData, TParams>) => {
  const { enableErrorHandling = true, toggleGlobalLoader = true, ...baseOptions } = options;

  const mutation = useTanstackMutation(baseOptions);

  useToggleErrorToast(enableErrorHandling, mutation.error);
  useToggleLoader(toggleGlobalLoader, mutation.isPending);

  return mutation;
};

export default useMutation;
