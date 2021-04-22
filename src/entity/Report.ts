import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { Ref } from "../utils/@types";
import { ObjectId } from "mongodb";
import { ReportType } from "../utils/@types/enums";
import { Stuff } from "./Stuff";

@ObjectType()
export class Report {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field(() => Date)
  readonly createdAt?: Date;

  @Field(() => Date)
  readonly updatedAt?: Date;

  @Field(() => [Stuff])
  @prop({ default: [], ref: () => Stuff, type: () => [Stuff] })
  public goods?: Ref<Stuff>[] | Stuff[];

  @Field(() => String)
  @prop()
  public name: string;

  @Field(() => ReportType)
  @prop()
  public type: ReportType;

  @Field(() => ID)
  @prop({ type: () => String })
  public reporterId: string;

  @Field(() => User, { nullable: true })
  @prop({ ref: () => User, type: () => User })
  public reporter?: Ref<User> | null;
}

export const ReportModel = getModelForClass(Report, {
  schemaOptions: { timestamps: true },
});
