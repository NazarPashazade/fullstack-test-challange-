import { compare } from "bcryptjs";
import * as jwt from "jsonwebtoken";

import config from "../config";
import { ErrorInterface } from "../interfaces";
import { User } from "../models";
import { getUser } from "./user.service";
import { BAD_LOGIN, permissionDenied, USER_NOT_FOUND } from "../shared/constants";
import { LoginDto } from "../shared/dto";

/**
 * Function to create a JWT (JSON Web Token) for authorization.
 * @function createAuthorizationToken
 * @param {User} user - A User object from the UserModel.
 * @returns  Returns a Promise that resolves to a JWT token string.
 */
export const createAuthorizationToken = (user: User): string => {
  const date = new Date();
  const expired = date.setHours(date.getHours() + 72);
  return jwt.sign(
    {
      user,
      expired,
      id: user.id,
    },
    config.jwt_secret,
  );
};

/**
 * Function to remove 'Bearer' prefix from an authorization token and return the token string.
 * @param {string} authorization - The user's authorization token, prefixed with 'Bearer'.
 * @returns {string|null} Returns the token string if present, otherwise null.
 */
export const getToken = (authorization: string): string => {
  if (!authorization) {
    return null;
  }

  const [, token] = authorization.split(" ");
  return token;
};

/**
 * Function to verify a user token. If the token is invalid, a permissionDenied {@link ErrorInterface} is thrown.
 * If the token is verified successfully, the function calls {@link getUser} and returns a User model.
 * If the user does not exist, a USER_NOT_FOUND {@link ErrorInterface} is thrown.
 * @param {string} token - The user's authorization token.
 * @returns {Promise<User>} - Returns a promise that resolves to the User model.
 * @throws {ErrorInterface} - Throws an error if the token is invalid or if the user does not exist.
 */
export const getUserFromToken = async (token: string): Promise<User> => {
  try {
    const decoded = jwt.verify(token, config.jwt_secret) as { id: number };
    const { id } = decoded;
    return getUser({ id }, USER_NOT_FOUND);
  } catch (e) {
    throw permissionDenied();
  }
};

/**
 * Function to verify user credentials and generate an authentication token.
 * It first checks if the user exists using the {@link getUser} method.
 * If the user does not exist, it throws a {@link ErrorInterface} with BAD_LOGIN.
 * If the user exists, it compares the provided password with the hashed password stored in UserModel.
 * If the user is not active, it triggers the {@link sendVerifyEmail} method and throws an error with INACTIVE_USER.
 * If all the checks are passed, it generates an authorization token using the
 * {@link createAuthorizationToken} method and returns the token.
 * @param {LoginDto} payload - The user's email and password.
 * @returns  Returns a promise that resolves to an object with a token string.
 * @throws {ErrorInterface} - Throws an error if the user does not exist, the password is incorrect, or the user is inactive.
 */
export const loginUser = async (payload: LoginDto): Promise<{ token: string }> => {
  const user = await getUser({ email: payload.email }, BAD_LOGIN);

  if (!(await compare(payload.password, user.password_hash))) {
    throw BAD_LOGIN;
  }

  const token = createAuthorizationToken(user);
  return { token };
};
