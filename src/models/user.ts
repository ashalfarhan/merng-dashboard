import { model, Schema } from "mongoose";
import { User } from "../entity/User";

export const UserModel = model<User>(
  "user",
  new Schema<User>({
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
  })
);
