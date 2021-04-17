import { ObjectType, Field } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { Ref } from "../utils/@types";

@ObjectType()
export class User {
  @Field(() => String)
  @prop()
  readonly id: string;

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
  email: string;

  @Field(() => String)
  @prop({ ref: () => User })
  public name?: Ref<User | string>;

  @Field(() => Boolean, { defaultValue: false })
  @prop({ type: () => Boolean, default: false })
  public isAdmin?: boolean;

  @prop()
  password: string;
}

export const UserModel = getModelForClass(User);
