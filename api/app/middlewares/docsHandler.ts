import * as path from "path";

import * as Koa from "koa";
import { compose } from "koa-convert";
import * as mount from "koa-mount";
import * as serve from "koa-static";

/**
 * Middleware function for redirecting "/docs" to "/docs/".
 *
 * @param {Koa.Context} ctx - The Koa context object.
 * @param {() => Promise<Koa.Next>} next - The next middleware function in the Koa middleware stack.
 * @returns {Promise<Koa.Next>} The next middleware function in the Koa middleware stack or a redirection to "/docs/".
 */
const docsRedirect = async (ctx: Koa.Context, next: () => Promise<Koa.Next>): Promise<Koa.Next> => {
  if (ctx.originalUrl === "/docs") {
    ctx.redirect("/docs/");
  }
  return next();
};

/**
 * Middleware function for serving the documentation.
 *
 * @returns {Koa.Middleware} A composed middleware for serving the documentation and handling redirection.
 */
export default (): Koa.Middleware =>
  compose(mount("/docs/", serve(path.join(__dirname, "..", "..", "docs"))), docsRedirect);
