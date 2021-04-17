import { Resolver, Mutation, Arg, FieldResolver, Root } from "type-graphql";
import * as bcrypt from "bcryptjs";
import { User, UserModel } from "../entity/User";
import { LoginPayload } from "../utils/@types";

@Resolver(() => User)
export default class UserResolver {
  @FieldResolver()
  name(@Root() { lastName, firstName }: User) {
    return `${firstName} ${lastName}`;
  }

  @Mutation(() => User)
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Arg("isAdmin", { nullable: true }) isAdmin?: boolean
  ) {
    try {
      const emailExist = await UserModel.findOne({ email });
      if (emailExist) return Error(`Oops, email is already exist`);
      const usernameExist = await UserModel.findOne({ username });
      if (usernameExist) return Error(`Oops, username is already exist`);
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await UserModel.create({
        email,
        username,
        isAdmin,
        password: hashedPassword,
        firstName,
        lastName,
      });
      await user.save();
      return user;
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => LoginPayload)
  async loginWithUsername(
    @Arg("username") username: string,
    @Arg("password") password: string
  ) {
    try {
      const user = await UserModel.findOne({ username });
      if (!user) return Error(`Oops, there's no user with this username`);
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return Error(`Oops, password is incorrect`);
      return {
        user,
        message: "Successfully login",
        token: "asdakj12kj3h12j3vh12h3",
      };
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => LoginPayload)
  async loginWithEmail(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) return Error(`Oops, there's no user with this email`);
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return Error(`Password is incorrect`);
      return {
        user,
        message: "Successfully login",
        token: "asdakj12kj3h12j3vh12h3",
      };
    } catch (error) {
      return error;
    }
  }
}
