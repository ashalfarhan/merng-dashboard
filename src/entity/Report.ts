import { Field, ID, Int, ObjectType } from "type-graphql";
import { User } from "./User";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { Ref } from "../utils/@types";

@ObjectType()
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
  @Field(() => String)
  @prop()
  readonly id: string;

  @Field(() => Date, { defaultValue: new Date() })
  @prop()
  public createdAt?: Date;

  @Field(() => Date, { defaultValue: new Date() })
  @prop()
  public updatedAt?: Date;

  @Field(() => ReportData)
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
