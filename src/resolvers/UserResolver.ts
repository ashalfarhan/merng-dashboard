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
import { ReportModel } from "../entity/Report";

@Resolver(() => User)
export default class UserResolver {
  /**
   * @returns FieldResolvers
   */
  @FieldResolver()
  name(@Root() { lastName, firstName }: User) {
    return `${firstName} ${lastName}`;
  }

  @FieldResolver()
  async reports(@Root() { _id }: User) {
    const reports = await ReportModel.find({ reporterId: _id });
    return reports;
  }

  /**
   * @returns Queries
   */
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() { payload }: MyContext) {
    if (!payload) {
      return Error("You have to be a user to access this");
    }
    try {
      const user = await UserModel.findOne({ _id: payload.userId });
      return user;
    } catch (error) {
      return error.message;
    }
  }

  @Query(() => [User], { nullable: true })
  @UseMiddleware(isAuth)
  async getAllUsers(@Ctx() { payload }: MyContext) {
    if (!payload) {
      return Error("Please login");
    }
    if (!payload.isAdmin) {
      return Error("Only admin can get all users");
    }
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      return error.message;
    }
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async getUser(@Ctx() { payload }: MyContext, @Arg("userId") userId: string) {
    if (!payload) {
      return Error("Please login");
    }
    try {
      const user = await UserModel.findById(userId);
      return user;
    } catch (error) {
      return error.message;
    }
  }

  /**
   * @returns Mutations
   */
  @Mutation(() => User, { nullable: true })
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
      if (emailExist) return Error(`Email is already exist`);
      const usernameExist = await UserModel.findOne({ username });
      if (usernameExist) return Error(`Username is already exist`);
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
      if (!user) return Error("There's no user with this username");
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return Error("Invalid username or password");
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
      if (!user) return Error("There's no user with this email");
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return Error("Invalid email or password");
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
