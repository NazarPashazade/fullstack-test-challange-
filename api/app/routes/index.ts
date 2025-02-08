import * as Router from "koa-router";

import { swagger } from "./swagger";
import { getAliveHandler } from "../controllers";
import auth from "./auth";

const routes = [auth];

const router = new Router({ prefix: "/api/v1" });

routes.forEach((route) => {
  router.use(route.middleware());
});

router.get("/swagger.json", swagger).get("/alive", (ctx) => getAliveHandler(ctx));

export default router;
