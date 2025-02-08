import { BaseModel } from "../../models/BaseModel";
import { SYSTEM_USER_NAME } from "../constants";

export const getUserName = (user: { first_name?: string; last_name?: string; email?: string }): string => {
  const userName = user?.first_name || user?.last_name ? `${user.first_name || ""} ${user.last_name || ""}` : "";
  const name = userName || user?.email || SYSTEM_USER_NAME;
  return name.trim();
};

export function groupEntitiesByAction<A extends BaseModel, B extends BaseModel>(
  base_data: A[],
  new_data: B[],
): { to_create: B[]; to_delete: number[]; to_update: B[] } {
  const to_create = new_data.filter((item: B) => !item.id);

  const to_delete = base_data
    .filter((item: A) => !new_data.find((new_item: B) => new_item.id === item.id))
    .map((d: A) => d.id as number);

  const to_update = new_data.filter((item: B) => item.id && !to_delete.includes(item.id as number));

  return { to_create, to_delete, to_update };
}
export const sliceText = (text: string, count: number) => {
  const cutText = text.slice(0, count);
  return `${cutText}${text.length > count ? "..." : ""}`;
};

export const getNicknameFromEmail = (email: string) => {
  return email.split("@")[0];
};

export const getFullName = <T>(user: Partial<T & { first_name: string; last_name: string }>) =>
  user ? `${user.first_name} ${user.last_name}` : "";
