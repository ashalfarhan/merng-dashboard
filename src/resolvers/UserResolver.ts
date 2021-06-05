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
  @FieldResolver()
  name(@Root() { lastName, firstName }: User) {
    return `${firstName} ${lastName}`;
  }
  @FieldResolver()
  async reports(@Root() { _id }: User) {
    const reports = await ReportModel.find({ reporterId: _id });
    return reports;
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() { payload }: MyContext) {
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
    if (!payload.isAdmin) {
      throw Error("Only admin can get all users");
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
  async getUser(@Arg("userId") userId: string) {
    try {
      const user = await UserModel.findById(userId);
      return user;
    } catch (error) {
      return error.message;
    }
  }

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
      if (emailExist) {
        throw Error(`Email is already exist`);
      }
      const usernameExist = await UserModel.findOne({ username });
      if (usernameExist) {
        throw Error(`Username is already exist`);
      }
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
      if (!user) {
        throw Error("Invalid username or password");
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw Error("Invalid username or password");
      }
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
      if (!user) return Error("Invalid email or password");
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
