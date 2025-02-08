import { User } from "@shared/models";

export interface AuthStateType {
  authentificated: boolean;
  activateUserInfo: Partial<User> | null;
}
