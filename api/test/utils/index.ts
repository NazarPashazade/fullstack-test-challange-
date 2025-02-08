import * as request from "supertest";

import factory from "../utils/factory";
import knex from "../../app/shared/utils/knex";
import { LoginDto } from "../../app/shared/dto";
import { Role, User } from "../../app/models";
import { app } from "../../app/app";
import { Roles } from "../../app/shared/constants";

let req: request.SuperTest<request.Test>;

const PASSWORD = process.env.TEST_PASSWORD;

export const createUser = async (roleName: string = Roles.SUPER_ADMIN, userPaylaod?: Partial<User>): Promise<User> => {
  const [user, role] = await Promise.all([
    factory.create("User", { ...userPaylaod, is_email_verified: true }),
    Role.query().where({ name: roleName }).first(),
  ]);

  await factory.create("UserRole", {
    role_id: (role as Role).id,
    user_id: user.id,
  });

  return user;
};

export const getAuthorizationToken = async (payload: LoginDto): Promise<string> => {
  const { body } = await request(app.callback())
    .post("/api/v1/auth/login")
    .set("Accept", "application/json")
    .set("origin", "localhost")
    .send(payload);

  return `Bearer ${body.token}`;
};

export const getAuthorizationInfo = async (roleName: Roles): Promise<{ user: User; token: string }> => {
  const user = await createUser(roleName);

  const token = await getAuthorizationToken({
    email: user.email,
    password: PASSWORD as string,
  });

  return { user, token };
};

export const createHousehold = async (token: string, primaryContactPayload: object, householdPayload: object) => {
  const request = getRequest();
  await request
    .post("/api/v1/questionnaire")
    .set("Accept", "application/json")
    .set("origin", "localhost")
    .set("Authorization", token)
    .send(primaryContactPayload)
    .expect(200);

  return request
    .post("/api/v1/questionnaire")
    .set("Accept", "application/json")
    .set("origin", "localhost")
    .set("Authorization", token)
    .send(householdPayload);
};

export function createMany<T>(model: string, data: Partial<T>[]) {
  return Promise.all(
    data.map((item) => {
      return factory.create(model, item);
    }),
  );
}

export const getRequest = (): request.SuperTest<request.Test> => {
  if (req) return req;
  req = request(app.callback()) as unknown as request.SuperTest<request.Test>;
  return req;
};

export async function truncate(table: string, knx: any = knex) {
  await knx.raw(`TRUNCATE TABLE ${table} CASCADE;`);
}

export async function truncateAllTables() {
  await truncate("user_roles");
  await truncate("users");
  await truncate("user_procedures");
  await truncate("procedures");
  await truncate("procedure_processes");
}

export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
