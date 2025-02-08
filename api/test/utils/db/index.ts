import { Client } from "pg";

import { ENVIRONMENT } from "../../../app/shared/constants";
import knexConfig from "../../../app/knexConfig";

const { connection } = knexConfig[ENVIRONMENT.test];

let pgClient: Client = null;

const getPgClient = async () => {
  if (!pgClient) {
    const client = new Client({
      host: connection.host,
      port: connection.port,
      user: connection.user,
      password: connection.password,
    });
    await client.connect();
    pgClient = client;
  }

  return pgClient;
};

const makeQuery = async (queryString: string) => {
  const client = await getPgClient();
  await client.query(queryString);
};

const checkDbExists = async (dbName: string): Promise<boolean> => {
  const client = new Client({
    host: connection.host,
    port: connection.port,
    user: connection.user,
    password: connection.password,
    database: "postgres", // Default database
  });
  await client.connect();

  const res = await client.query(`SELECT 1 FROM pg_database WHERE datname='${dbName}'`);
  await client.end();

  return res.rowCount > 0;
};

export const createDb = async () => {
  const dbName = connection.database;
  if (!(await checkDbExists(dbName))) {
    const client = new Client({
      host: connection.host,
      port: connection.port,
      user: connection.user,
      password: connection.password,
      database: "postgres", // Default database
    });
    await client.connect();
    await client.query(`CREATE DATABASE "${dbName}"`);
    await client.end();
  }
};

export const dropDb = async () => {
  const dbName = connection.database;
  if (await checkDbExists(dbName)) {
    const client = new Client({
      host: connection.host,
      port: connection.port,
      user: connection.user,
      password: connection.password,
      database: "postgres", // Default database
    });
    await client.connect();
    await client.query(`DROP DATABASE IF EXISTS "${dbName}"`);
    await client.end();
  }
};

export const close = async () => {
  if (pgClient) {
    await pgClient.end();
    pgClient = null;
  }
};
