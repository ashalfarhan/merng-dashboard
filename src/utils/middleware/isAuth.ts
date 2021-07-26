import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../../@types";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const bearer = context.req.headers["authorization"];
  try {
    if (!bearer) {
      throw Error("Authentication failed, no token in headers");
    }
    const [_, token] = bearer.split(" ");
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (error) {
    return error;
  }
  return next();
};
