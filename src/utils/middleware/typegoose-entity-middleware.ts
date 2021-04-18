import { MiddlewareFn } from "type-graphql";

export const TypegooseEntityMiddleware: MiddlewareFn = async (_, next) => {
  const result = await next();
  if (result) {
    if (Object.getOwnPropertyNames(result).includes("_doc")) {
      // Include id as _id
      result._doc["id"] = result._doc._id;
      return result._doc;
    }
    return result;
  }
};
