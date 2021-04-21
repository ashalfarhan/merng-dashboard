import { User } from "../../entity/User";
import { Field, ID, InputType, Int, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { StuffType } from "./enums";

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

  @Field(() => StuffType)
  public type: StuffType;

  @Field(() => Int)
  public amount: number;
}

@InputType()
export class EditInput {
  @Field(() => ID)
  public _id: string;

  @Field(() => String, { nullable: true })
  public stuff: string;

  @Field(() => Number, { nullable: true })
  public price: number;

  @Field(() => StuffType, { nullable: true })
  public type: StuffType;

  @Field(() => Int, { nullable: true })
  public amount: number;
}

export interface MyContext {
  req: Request;
  res: Response;
  payload?: {
    userId: string;
    isAdmin: boolean;
  };
}
