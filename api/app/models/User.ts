import { join } from "path";

import { Model, QueryBuilder } from "objection";

import { Role } from "./Role";
import { SocialLogin } from "./SocialLogin";

export type UserFields = keyof User;

export const defaultUserFields: UserFields[] = ["id", "first_name", "last_name", "phone", "email", "is_active"];

export class User extends Model {
  static tableName = "users";

  readonly id!: number;
  first_name!: string;
  last_name!: string;
  phone: string;
  email!: string;
  photo: string;
  password_hash: string;

  created_at: Date;
  updated_at: Date;
  created_by: string;
  updated_by: string;
  is_active: boolean;
  is_email_verified: boolean;
  confirmation_hash: string;

  roles?: Role[];

  static modifiers = {
    defaultSelects(builder: QueryBuilder<User>) {
      return builder.select(...defaultUserFields.map((field) => `users.${field}`));
    },
  };

  static relationMappings = {
    roles: {
      relation: Model.ManyToManyRelation,
      modelClass: join(__dirname, "Role"),
      join: {
        from: "users.id",
        through: {
          from: "user_roles.user_id",
          to: "user_roles.role_id",
        },
        to: "roles.id",
      },
    },
    social_login: {
      relation: Model.HasManyRelation,
      modelClass: join(__dirname, "SocialLogin"),
      join: {
        to: `${User.tableName}.id`,
        from: `${SocialLogin.tableName}.user_id`,
      },
    },
  };
}
