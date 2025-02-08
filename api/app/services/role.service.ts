import { Role, UserRole } from "../models";
import { findEntities } from "../shared/helpers/model";

/**
 * Function to find user roles by user id.
 * @param {number} user_id - The id of the user.
 * @returns {Promise<number[]>} Returns a Promise that resolves to an array of role ids associated with the user.
 */
export const getRolesIdsByUser = async (user_id: number): Promise<number[]> => {
  const user_roles = await findEntities<UserRole>(UserRole, { user_id }, false, []);

  return user_roles.map((userRole) => userRole.role_id);
};

/**
 * Function to get a list of roles with their respective permissions based on provided role ids.
 * @param {number[]} roles - An array of role ids.
 * @returns {Promise<Role[]>} Returns a Promise that resolves to an array of Role objects each
 * containing respective permissions.
 */
export const getRolesWithPermissionsByRoleIds = async (roles: number[]): Promise<Role[]> => {
  return findEntities<Role>(Role, { id: roles }, false, [
    {
      relation: "permissions",
      modifier: "defaultSelects",
    },
  ]);
};
