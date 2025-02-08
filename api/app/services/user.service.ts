import { Transaction } from "objection";

import { ErrorInterface, ModelWhere } from "../interfaces";
import { User } from "../models";
import { findEntities } from "../shared/helpers/model";

/**
 * Function to find a user based on a WHERE clause that partially includes UserModel fields.
 * If the user is not found and an error is provided, it throws the provided error.

 * @param {ModelWhere<User>} where - The WHERE clause according to the user model.
 * @param {ErrorInterface} [error] - The error to throw if the user is not found.
 * @param {Transaction} [transaction] - Optional knex transaction.
 * @returns  Returns a promise that resolves to the user model.
 * @throws {ErrorInterface} - Throws the provided error if the user is not found.
 */
export const getUser = async (
  where: ModelWhere<User>,
  error?: ErrorInterface,
  transaction?: Transaction,
): Promise<User> => {
  const user = await findEntities<User>(User, where, true, [], transaction);

  if (!user && error) {
    throw error;
  }

  return user;
};
