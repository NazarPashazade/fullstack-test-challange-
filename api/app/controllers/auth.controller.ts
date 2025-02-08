import { RequestInterface } from "../interfaces";
import { loginUser } from "../services/auth.service";
import { getUser } from "../services/user.service";
import { LoginDto } from "../shared/dto";

/**
 * Function that checks if a user exists in the system.
 * @param {RequestInterface<{ email: string }>} ctx - The context object encapsulating the request with
 * a body containing an email string.
 * @returns  Returns a Promise that resolves to an object with a
 * boolean property "isUserExist".
 */
export const checkUserHandler = async (ctx: RequestInterface<{ email: string }>) => {
  const user = await getUser({ email: ctx.request.body.email });

  ctx.ok({
    isUserExist: !!user,
  });
};

/**
 * Function that logs in a user and provides an access token.
 * It calls the {@link loginUser} function which attempts to log in the user and returns a token.
 * @param {RequestInterface<LoginDto>} ctx - The context object encapsulating the request with a body of type LoginDto.
 * @returns  Returns a Promise that resolves to an object with a token string.
 */
export const loginHandler = async (ctx: RequestInterface<LoginDto>) => {
  const { body } = ctx.request;

  const result = await loginUser(body);
  ctx.ok(result);
};
