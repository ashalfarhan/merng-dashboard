import { User } from "../../entity/User";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";

export type Ref<T> = T | ObjectId;

@ObjectType()
export class LoginPayload {
  @Field()
  public user: User;

  @Field()
  public token: string;

  @Field()
  public message: string;
}

@InputType()
export class CreateInput {
  @Field(() => String)
  public stuff: string;

  @Field(() => Int)
  public price: number;
}
@InputType()
export class EditInput {
  @Field(() => String, { nullable: true })
  public reporterId: string;

  @Field(() => String, { nullable: true })
  public stuff: string;

  @Field(() => Number, { nullable: true })
  public price: number;
}
