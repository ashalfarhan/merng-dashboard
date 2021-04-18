import { ObjectType, Field, ID } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { Ref } from "../utils/@types";
import { ObjectId } from "mongodb";

@ObjectType()
export class User {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field()
  @prop()
  public firstName: string;

  @Field()
  @prop()
  public lastName: string;

  @Field()
  @prop()
  public username: string;

  @Field()
  @prop()
  public email: string;

  @Field(() => String)
  @prop({ ref: () => User })
  public name?: Ref<User | string>;

  @Field(() => Boolean)
  @prop({ type: () => Boolean, default: false })
  public isAdmin?: boolean;

  @prop()
  password: string;
}

export const UserModel = getModelForClass(User);
