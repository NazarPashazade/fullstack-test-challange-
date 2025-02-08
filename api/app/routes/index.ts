import * as Router from "koa-router";

import { swagger } from "./swagger";
import { getAliveHandler } from "../controllers";
import auth from "./auth";
import userRouter from "./user.routes";

const routes = [auth, userRouter];

const router = new Router({ prefix: "/api/v1" });

routes.forEach((route) => {
  router.use(route.middleware());
});

router.get("/swagger.json", swagger).get("/alive", (ctx) => getAliveHandler(ctx));

export default router;
