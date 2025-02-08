import { User } from "../../app/models";
import { createAuthorizationToken } from "../../app/services/auth.service";
import { getRequest } from "../utils";
import factory from "../utils/factory";

const request = getRequest();

describe("User Router", () => {
  let user: User;
  let token: string;

  beforeEach(async () => {
    user = await factory.create("User");
    token = createAuthorizationToken(user);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /user/profile", () => {
    it("Should return user profile successfully", async () => {
      const res = await request
        .get("/api/v1/user/profile")
        .set("origin", "localhost")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body).toEqual({
        id: user.id,
        email: user.email,
        name: `${user.first_name} ${user.last_name}`,
      });
    });

    it("Should return 403 if token is not valid", async () => {
      token = token + "invalid";
      const res = await request
        .get("/api/v1/user/profile")
        .set("origin", "localhost")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect(403);

      expect(res.body).toHaveProperty("message", "Permission denied");
    });

    it("Should return 500 if no token", async () => {
      const res = await request
        .get("/api/v1/user/profile")
        .set("origin", "localhost")
        .set("Accept", "application/json")
        .expect(500);
    });
  });
});
