import { Report, ReportModel } from "../entity/Report";
import { Stuff, StuffModel } from "../entity/Stuff";
import { MyContext, EditStuffInput, AddStuffInput } from "../utils/@types";
import { isAuth } from "../utils/middleware/isAuth";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class StuffResolver {
  @Mutation(() => Stuff)
  @UseMiddleware(isAuth)
  async editStuff(
    @Ctx() { payload }: MyContext,
    @Arg("data") data: EditStuffInput
  ) {
    if (!payload) {
      return Error("Must be a user to edit a report");
    }
    try {
      const saved = await StuffModel.findOneAndUpdate(
        { _id: data._id },
        { ...data }
      );
      if (!saved) {
        return Error("Report with this id is not exist, please create one");
      }
      return saved;
    } catch (error) {
      return error.message;
    }
  }

  @Mutation(() => Report)
  async addStuff(@Arg("data") data: AddStuffInput) {
    try {
      const report = await ReportModel.findById(data.reportId);
      if (!report) {
        return Error("Report with this id not found");
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
      console.log("before update: ", report);
      console.log("after update: ", added);
      return added;
    } catch (error) {
      return error.message;
    }
  }
}
