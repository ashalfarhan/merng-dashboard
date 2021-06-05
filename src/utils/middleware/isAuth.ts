import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../@types";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const bearer = context.req.headers["authorization"];
  if (!bearer) {
    throw Error("Please include your token to access this route");
  }
  try {
    const token = bearer.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (error) {
    throw Error(error.message);
  }
  return next();
};
