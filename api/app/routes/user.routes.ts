import * as Router from "@koa-better-modules/joi-router";

import { getUserProfileHandler } from "../controllers/user.controller";
import authMiddleware from "../middlewares/authHandler"; //
import { errorValidators, userProfileValidator } from "../shared/validators";

const userRouter = new Router();

userRouter.prefix("/user");

userRouter.get(
  "/profile",
  {
    validate: {
      output: {
        200: { body: userProfileValidator },
        500: { body: errorValidators },
        401: { body: errorValidators },
      },
    },

    meta: {
      swagger: {
        summary: "Get User Profile",
        description: "Returns the authenticated user's profile information (id, email, name)",
        tags: ["USER"],
      },
    },
  },
  authMiddleware,
  getUserProfileHandler,
);

export default userRouter;
