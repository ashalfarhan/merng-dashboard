import { Field, ID, Int, ObjectType } from "type-graphql";
import { User } from "./User";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { Ref } from "../utils/@types";
import { ObjectId } from "mongodb";
import { ReportType, StuffType } from "../utils/@types/enums";

@ObjectType({ simpleResolvers: true })
export class ReportData {
  @Field(() => ID)
  readonly _id?: ObjectId | string;

  @Field(() => String)
  @prop()
  public stuff: string;

  @Field(() => Int)
  @prop()
  public price: number;

  @Field(() => Int)
  @prop()
  public amount: number;

  @Field(() => StuffType)
  @prop()
  public type: StuffType;
}

@ObjectType()
export class Report {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field(() => Date)
  public createdAt?: Date;

  @Field(() => Date)
  public updatedAt?: Date;

  @Field(() => ReportData, { simple: true })
  @prop({ type: () => ReportData })
  public detail: ReportData;

  @Field(() => String)
  @prop()
  public name: string;

  @Field(() => ReportType)
  @prop()
  public type: ReportType;

  @Field(() => ID, { nullable: true })
  @prop({ type: () => String })
  public reporterId: string;

  @Field(() => User, { nullable: true })
  @prop({ ref: () => User, type: () => User })
  public reporter?: Ref<User> | null;
}

export const ReportModel = getModelForClass(Report, {
  schemaOptions: { timestamps: true },
});
