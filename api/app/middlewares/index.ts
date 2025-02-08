import * as bodyParser from "koa-bodyparser";
import { compose } from "koa-convert";
import * as helmet from "koa-helmet";
import * as logger from "koa-logger";
//eslint-disable-next-line
// @ts-ignore
import * as respond from "koa-respond";
//eslint-disable-next-line
// @ts-ignore
import * as responseTime from "koa-response-time";
import * as cors from "koa2-cors";

import authHandler from "./authHandler";
import errorHandler from "./errorHandler";
import { bodyParserOptions, corsOptions, helmetOptions, respondOptions } from "./options";
import config from "../config";
import limit from "./rateLimitHandler";
import { ENVIRONMENT } from "../shared/constants";

const { env } = config;
const middlewares = [
  responseTime(),
  logger(env === ENVIRONMENT.test ? () => {} : undefined),
  helmet(helmetOptions),
  respond(respondOptions),
  bodyParser(bodyParserOptions),
  cors(corsOptions),
  errorHandler,
  authHandler,
  limit,
];

export default () => compose(...middlewares);
