import sharedApi from "./api";

import { IGuestModel } from "@shared/interfaces/Guest.interface";
import { QueryOptions } from "@shared/interfaces/Api.interface";
import { useQuery } from "@shared/api";

export enum GuestQuery {
  getMyProfile = "getMyProfile",
}

export const useCurrentUserQuery = <TData = IGuestModel>(options?: QueryOptions<IGuestModel, TData, [GuestQuery]>) =>
  useQuery({
    queryKey: [GuestQuery.getMyProfile],
    queryFn: () => sharedApi.getUserDetails().then((response) => response),
    ...options,
  });
