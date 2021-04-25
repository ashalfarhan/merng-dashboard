import { Field, ID, Int, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { StuffType } from "../utils/@types/enums";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Report } from "./Report";

@ObjectType()
export class Stuff {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field(() => Date)
  readonly createdAt: Date;

  @Field(() => Date)
  readonly updatedAt: Date;

  @Field(() => String)
  @prop()
  public name: string;

  @Field(() => Int)
  @prop()
  public price: number;

  @Field(() => ID)
  @prop({ type: () => String })
  public reportId?: Ref<Report>;

  @Field(() => Int)
  @prop()
  public amount: number;

  @Field(() => StuffType)
  @prop()
  public type: StuffType;
}

export const StuffModel = getModelForClass(Stuff, {
  schemaOptions: { timestamps: true },
});
