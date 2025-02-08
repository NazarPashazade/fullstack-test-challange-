import * as Koa from "koa";

import { User } from "../models";
import { getToken, getUserFromToken } from "../services/auth.service";
import { permissionDenied } from "../shared/constants";

/**
 * Middleware function for handling authentication.
 *
 * @param {Koa.Context} ctx - The Koa context object.
 * @param {() => Koa.Next} next - The next middleware function in the Koa middleware stack.
 * @returns {Promise<Koa.Next>} The next middleware function in the Koa middleware stack.
 * @throws {Error} If the user is not authenticated (i.e., the token is not valid or the user does not exist), it throws an error.
 */
export default async (ctx: Koa.Context, next: () => Koa.Next): Promise<Koa.Next> => {
  const token = getToken(ctx.request.headers.authorization);
  if (token) {
    const user: User = await getUserFromToken(token);

    if (!user) {
      throw permissionDenied();
    }

    ctx.user = user;
  }
  return next();
};
