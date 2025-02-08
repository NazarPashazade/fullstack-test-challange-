import { IGuestModel } from "@shared/interfaces/Guest.interface";

export interface IAuthInterface {
  onLogin: (token: string) => void;
  onLogout: () => void;
  isAuthenticated: boolean;
  user?: IGuestModel;
}
