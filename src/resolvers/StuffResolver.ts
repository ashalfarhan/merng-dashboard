import {
  Arg,
  Args,
  Ctx,
  Mutation,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Report, ReportModel } from "../entity/Report";
import { Stuff, StuffModel } from "../entity/Stuff";
import { MyContext, EditStuffInput, AddStuffInput } from "../utils/@types";
import { isAuth } from "../utils/middleware/isAuth";

@Resolver()
export class StuffResolver {
  @Mutation(() => Stuff, { nullable: true })
  @UseMiddleware(isAuth)
  async editStuff(
    @Ctx() { payload }: MyContext,
    @Arg("data") data: EditStuffInput
  ) {
    if (!payload) {
      return Error("Must be a user to edit a report");
    }
    try {
      const stuff = await StuffModel.findById(data._id);
      if (!stuff) {
        return Error("Stuff with this id is not found");
      }
      const report = await ReportModel.findById(stuff.reportId);
      if (report?.reporterId !== payload.userId || !payload.isAdmin) {
        return Error(
          "Only creator of this report/stuff can add or modify this report/stuff"
        );
      }
      const saved = await StuffModel.findOneAndUpdate(
        { _id: data._id },
        { ...data }
      );
      if (!saved) {
        return Error("Stuff with this id is not exist, please create one");
      }
      return saved;
    } catch (error) {
      return error.message;
    }
  }

  @Mutation(() => Report, { nullable: true })
  @UseMiddleware(isAuth)
  async addStuff(@Ctx() { payload }: MyContext, @Args() data: AddStuffInput) {
    if (!payload) {
      return Error("Must be a user to edit a report");
    }
    try {
      const report = await ReportModel.findById(data.reportId);
      if (!report) {
        return Error("Report with this id not found");
      }
      if (report.reporterId !== payload.userId || !payload.isAdmin) {
        return Error(
          "Only creator of this report/stuff can add or modify this report/"
        );
      }
      const newStuff = await StuffModel.create({
        ...data,
      });
      const added = await ReportModel.findOneAndUpdate(
        { _id: data.reportId },
        {
          $push: {
            goods: newStuff,
          },
        }
      );
      return added;
    } catch (error) {
      return error.message;
    }
  }
}
