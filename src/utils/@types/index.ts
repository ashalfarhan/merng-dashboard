import { User } from "../../entity/User";
import { ArgsType, Field, ID, InputType, Int, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { ReportType, StuffType } from "./enums";

export type Ref<T> = T | ObjectId;

@ObjectType()
export class LoginPayload {
  @Field()
  public user: User;

  @Field()
  public token: string;
}

@InputType()
export class StuffInput {
  @Field(() => ID, { nullable: true })
  readonly reportId: string;

  @Field(() => String)
  public name: string;

  @Field(() => Int)
  public price: number;

  @Field(() => StuffType)
  public type: StuffType;

  @Field(() => Int)
  public amount: number;
}

@ArgsType()
export class AddStuffInput {
  @Field(() => ID)
  public reportId: string;

  @Field(() => String)
  public name: string;

  @Field(() => Int)
  public price: number;

  @Field(() => StuffType)
  public type: StuffType;

  @Field(() => Int)
  public amount: number;
}

@ArgsType()
export class CreateReportArgs {
  @Field(() => String)
  public name: string;

  @Field(() => StuffInput)
  public data: StuffInput;

  @Field(() => ReportType)
  public type: ReportType;
}

@InputType()
export class EditStuffInput {
  @Field(() => ID)
  public _id: ObjectId;

  @Field(() => String, { nullable: true })
  public name?: string;

  @Field(() => Number, { nullable: true })
  public price?: number;

  @Field(() => StuffType, { nullable: true })
  public type?: StuffType;

  @Field(() => Int, { nullable: true })
  public amount?: number;
}

@InputType()
export class EditReportInput {
  @Field(() => ID)
  public _id: ObjectId;

  @Field(() => String, { nullable: true })
  public name: string;

  @Field(() => ReportType, { nullable: true })
  public type: ReportType;
}

interface MyPayload {
  userId: string;
  isAdmin: boolean;
}

export interface MyContext {
  req: Request;
  res: Response;
  payload: MyPayload;
}
