import { ObjectType, Field, ID } from "type-graphql";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Report } from "./Report";

@ObjectType()
export class User {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field(() => String)
  @prop({ ref: () => User })
  readonly name: Ref<User>;

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

  @Field(() => Boolean)
  @prop({ type: () => Boolean, default: false })
  public isAdmin?: boolean;

  @Field(() => [Report])
  @prop({ ref: "Report", type: () => [Report], default: [] })
  public reports?: Ref<Report>[];

  @prop()
  password: string;
}

export const UserModel = getModelForClass(User);
