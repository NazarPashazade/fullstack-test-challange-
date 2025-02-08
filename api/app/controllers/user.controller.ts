import { Context } from "koa";

import { getUser } from "../services/user.service";

/**
 * Function that retrieves the profile of the authenticated user.
 * @param {RequestInterface} ctx - The context object encapsulating the request and authenticated user info.
 * @returns Returns a Promise that resolves to an object containing user information (id, email, name).
 */

export const getUserProfileHandler = async (ctx: Context) => {
  const user = await getUser({ email: ctx.user.email });

  if (!user) {
    return ctx.notFound({ code: 404, message: "User not found" });
  }

  ctx.ok({
    id: user.id,
    email: user.email,
    name: `${user.first_name} ${user.last_name}`,
  });
};
