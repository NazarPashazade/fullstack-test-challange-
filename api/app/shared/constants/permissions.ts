export enum Roles {
  ADMIN = "admin",
  USER = "user",
  SUPER_ADMIN = "super admin",
}

export enum Permission {
  //client
  GET_CLIENT_LIST = "get_client_list",
  UPDATE_CLIENT = "update_client",

  //admin
  CREATE_ADMIN = "create_admin",
  DELETE_ADMIN = "delete_admin",
  GET_ADMIN_LIST = "get_admin_list",
  UPDATE_ADMIN = "update_admin",
}
