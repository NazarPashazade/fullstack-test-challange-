import * as Router from "@koa-better-modules/joi-router";

import { checkUserHandler, loginHandler } from "../controllers";
import { errorValidators, loginValidator, userTokenValidator } from "../shared/validators";

const auth = new Router();
auth.prefix("/auth");

auth.post(
  "/check_user",
  {
    validate: {
      type: "json",
      body: Router.Joi.object({
        email: Router.Joi.string().email().required(),
      }),
      output: {
        200: {
          body: Router.Joi.object({
            isUserExist: Router.Joi.boolean().required(),
          }),
        },
        500: {
          body: errorValidators,
        },
        401: {
          body: errorValidators,
        },
      },
    },

    meta: {
      swagger: {
        summary: "Check if User Exists",
        description: "Returns whether a user exists based on the provided email",
        tags: ["AUTH"],
      },
    },
  },
  checkUserHandler,
);

auth.post(
  "/login",
  {
    validate: {
      type: "json",
      body: loginValidator,
      output: {
        200: {
          body: userTokenValidator,
        },
        500: {
          body: errorValidators,
        },
        401: {
          body: errorValidators,
        },
      },
    },

    meta: {
      swagger: {
        summary: "Login User",
        description: "Authenticates a user and returns an auth token",
        tags: ["AUTH"],
      },
    },
  },
  loginHandler,
);

export default auth;
