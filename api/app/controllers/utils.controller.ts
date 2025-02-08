import { ParameterizedContext } from "koa";

/**
 * Handler function to get information about the server's uptime and start time.
 * @async
 * @param {ParameterizedContext} ctx - The Koa context object.
 */
export const getAliveHandler = (ctx: ParameterizedContext) => {
  const uptime_minutes = process.uptime() / 60;
  const current_date = new Date().toISOString();
  const start_date = new Date(Date.now() - process.uptime() * 1000).toISOString();
  ctx.ok({
    uptime_minutes,
    current_date,
    start_date,
  });
};
