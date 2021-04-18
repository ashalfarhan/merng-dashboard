import {
  Resolver,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Ctx,
  Query,
  UseMiddleware,
} from "type-graphql";
import * as bcrypt from "bcryptjs";
import { User, UserModel } from "../entity/User";
import { LoginPayload, MyContext } from "../utils/@types";
import { createToken } from "../utils/helpers/createToken";
import { isAuth } from "../utils/middleware/isAuth";

@Resolver(() => User)
export default class UserResolver {
  @FieldResolver()
  name(@Root() { lastName, firstName }: User) {
    return `${firstName} ${lastName}`;
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() { payload }: MyContext) {
    if (!payload) {
      return null;
    }
    const user = await UserModel.findOne({ _id: payload.userId });
    return user;
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
      return error.message;
    }
  }

  @Mutation(() => LoginPayload, { nullable: true })
  async loginWithUsername(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ) {
    try {
      const user = await UserModel.findOne({ username });
      if (!user) return null;
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return null;
      const { accessToken, refreshToken } = createToken(user);
      res.cookie("fwas", refreshToken, { httpOnly: true });
      return {
        user,
        token: accessToken,
      };
    } catch (error) {
      return error.message;
    }
  }

  @Mutation(() => LoginPayload, { nullable: true })
  async loginWithEmail(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ) {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) return null;
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return null;
      const { accessToken, refreshToken } = createToken(user);
      res.cookie("fwas", refreshToken, { httpOnly: true });
      return {
        user,
        token: accessToken,
      };
    } catch (error) {
      return error.message;
    }
  }
}
