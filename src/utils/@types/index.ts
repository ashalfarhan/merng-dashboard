import { User } from "../../entity/User";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { Request, Response } from "express";

export type Ref<T> = T | ObjectId;

@ObjectType()
export class LoginPayload {
  @Field()
  public user: User;

  @Field()
  public token: string;
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
  public stuff: string;

  @Field(() => Number, { nullable: true })
  public price: number;
}

export interface MyContext {
  req: Request;
  res: Response;
  payload?: {
    userId: string;
    isAdmin: boolean;
  };
}
