import { Field, ID, Int, ObjectType } from "type-graphql";
import { User } from "./User";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { Ref } from "../utils/@types";
import { ObjectId } from "mongodb";

@ObjectType({ simpleResolvers: true })
class ReportData {
  @Field(() => String)
  @prop()
  public stuff: string;

  @Field(() => Int)
  @prop()
  public price: number;
}

@ObjectType()
export class Report {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field(() => Date)
  @prop({ type: () => Date, default: new Date() })
  public createdAt?: Date;

  @Field(() => Date)
  @prop({ type: () => Date, default: new Date() })
  public updatedAt?: Date;

  @Field(() => ReportData, { simple: true })
  @prop({ type: () => ReportData })
  public detail: ReportData;

  @Field()
  @prop()
  public name: string;

  @Field(() => ID, { nullable: true })
  @prop({ type: () => String })
  public reporterId?: string;

  @Field(() => User, { nullable: true })
  @prop({ ref: () => User, type: () => User })
  public reporter?: Ref<User> | null;
}

export const ReportModel = getModelForClass(Report);
