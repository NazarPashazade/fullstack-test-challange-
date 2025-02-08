import { ConfigInterface } from "./interfaces";
import { ENVIRONMENT } from "./shared/constants";

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";

require("dotenv").config({ path: envFile });

const common: ConfigInterface = {
  env: (process.env.NODE_ENV as ENVIRONMENT) || ENVIRONMENT.development,
  host: process.env.HOST,
  port: Number(process.env.PORT),
  server_url: process.env.SERVER_URL,
  frontend_url: process.env.FE_URL,
  sentry_url: process.env.SENTRY_URL,
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    region: "us-east-1",
    bucket: process.env.AWS_BUCKET || "",
    cdn: process.env.AWS_CDN || "",
  },
  postmark: {
    token: "123",
    from: "",
  },
  jwt_secret: process.env.JWT_SECRET,
};

const development: ConfigInterface = {
  ...common,
};

const prod: ConfigInterface = {
  ...common,
};

const test: ConfigInterface = {
  ...common,
};

const qa: ConfigInterface = {
  ...common,
};
const uat: ConfigInterface = {
  ...common,
};

interface EnvConfigInterface {
  [key: string]: ConfigInterface;
}

const config: EnvConfigInterface = {
  development,
  qa,
  uat,
  prod,
  test,
};

export default config[process.env.NODE_ENV || "development"];
