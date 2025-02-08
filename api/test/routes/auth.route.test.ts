import { getRequest, truncate } from "../utils";
import factory from "../utils/factory";

const PASSWORD = process.env.TEST_PASSWORD;
const TEST_EMAIL = process.env.TEST_EMAIL;

describe("Auth route", () => {
  const request = getRequest();

  beforeEach(async () => {
    return truncate("users");
  });

  afterEach(async () => {
    return truncate("users");
  });

  describe("POST /auth/check_user", () => {
    it("[AUTH/CHECK_USER] Should return user Exist false", async () => {
      await request
        .post("/api/v1/auth/check_user")
        .set("Accept", "application/json")
        .set("origin", "localhost")
        .send({
          email: "noname@gmail.com",
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.isUserExist).toBe(false);
        });
    });

    it("[AUTH/CHECK_USER] Should get status 200", async () => {
      const user = await factory.create("User");
      await request
        .post("/api/v1/auth/check_user")
        .set("Accept", "application/json")
        .set("origin", "localhost")
        .send({
          email: user.email,
        })
        .expect(200);
    });

    it("[AUTH/CHECK_USER] Should get status 400", async () => {
      await request
        .post("/api/v1/auth/check_user")
        .set("Accept", "application/json")
        .set("origin", "localhost")
        .send({
          email: "",
        })
        .expect(400);
    });
  });

  describe("POST /auth/login", () => {
    it("[AUTH/LOGIN] Should get status 200", async () => {
      const user = await factory.create("User");

      const res = await request
        .post("/api/v1/auth/login")
        .set("Accept", "application/json")
        .set("origin", "localhost")
        .send({
          email: user.email,
          password: PASSWORD,
        });

      expect(res.status).toBe(200);
    });

    it("[AUTH/LOGIN] Should return 400 (payload without password)", async () => {
      await request
        .post("/api/v1/auth/login")
        .set("Accept", "application/json")
        .set("origin", "localhost")
        .send({
          email: TEST_EMAIL,
        })
        .expect(400);
    });

    it("[AUTH/LOGIN] Should return 401 (The user does not exist in system)", async () => {
      await request
        .post("/api/v1/auth/login")
        .set("Accept", "application/json")
        .set("origin", "localhost")
        .send({
          email: TEST_EMAIL,
          password: PASSWORD,
        })
        .expect(401);
    });
  });
});
