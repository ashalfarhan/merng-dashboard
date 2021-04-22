import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { ReportType } from "../utils/@types/enums";
import { Stuff } from "./Stuff";
import { Ref } from "../utils/@types";
@ObjectType()
export class Report {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field(() => Date)
  readonly createdAt: Date;

  @Field(() => Date)
  readonly updatedAt: Date;

  @Field(() => [Stuff])
  @prop({ default: [], ref: () => Stuff, type: () => [Stuff] })
  readonly goods: Ref<Stuff>[];

  @Field(() => User)
  @prop({ ref: () => "User", type: () => User })
  readonly reporter: Ref<User>;

  @Field(() => String)
  @prop()
  public name: string;

  @Field(() => ReportType)
  @prop()
  public type: ReportType;

  @Field(() => ID)
  @prop({ type: () => String })
  public reporterId: Ref<User | string>;
}

export const ReportModel = getModelForClass(Report, {
  schemaOptions: { timestamps: true },
});
