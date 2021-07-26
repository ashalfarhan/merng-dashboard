import {
  Arg,
  Args,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Stuff, StuffModel, Report, ReportModel } from "../entity";
import { StuffType, MyContext, EditStuffInput, AddStuffInput } from "../@types";
import { isAuth } from "../utils";

@Resolver()
export class StuffResolver {
  @Mutation(() => Stuff, { nullable: true })
  @UseMiddleware(isAuth)
  async editStuff(
    @Ctx() { payload }: MyContext,
    @Arg("data") data: EditStuffInput,
  ) {
    try {
      const stuff = await StuffModel.findById(data._id);
      if (!stuff) {
        throw Error("Stuff with this id is not found");
      }
      const report = await ReportModel.findById(stuff.reportId);
      if (!report) {
        throw Error("Cannot find report with id of " + stuff.reportId);
      }
      if (report.reporterId == payload.userId || payload.isAdmin) {
        const { _id, ...rest } = data;
        const saved = await StuffModel.findByIdAndUpdate(_id, { ...rest });
        if (!saved) {
          throw Error("Stuff with this id is not exist, please create one");
        }
        return saved;
      }
      throw Error(
        "Only creator of this stuff can modify this stuff or an admin",
      );
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => Report, { nullable: true })
  @UseMiddleware(isAuth)
  async addStuff(@Ctx() { payload }: MyContext, @Args() data: AddStuffInput) {
    try {
      const report = await ReportModel.findById(data.reportId);
      if (!report) {
        throw Error("Report with this id not found");
      }
      if (report.reporterId === payload.userId || payload.isAdmin) {
        const newStuff = await StuffModel.create({
          ...data,
        });
        const added = await ReportModel.findByIdAndUpdate(data.reportId, {
          $push: {
            goods: newStuff,
          },
        });
        return added;
      }
      throw Error("You must be and admin or the creator of this report");
    } catch (error) {
      return error;
    }
  }

  @Query(() => [Stuff], { nullable: true })
  async getInventory() {
    try {
      const items = await StuffModel.find({ type: StuffType.STATIONARY });
      return items;
    } catch (error) {
      return error;
    }
  }
}
