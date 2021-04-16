import { ObjectType, Field } from "type-graphql";
import { Document } from "mongoose";

@ObjectType()
export class User extends Document {
  @Field(() => String)
  readonly id: string;

  @Field()
  public firstName: string;

  @Field()
  public lastName: string;

  @Field()
  public username: string;

  @Field()
  public email: string;

  password: string;
}
