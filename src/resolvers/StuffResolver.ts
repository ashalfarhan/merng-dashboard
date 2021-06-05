import {
  Arg,
  Args,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Report, ReportModel } from "../entity/Report";
import { Stuff, StuffModel } from "../entity/Stuff";
import { StuffType } from "../utils/@types/enums";
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
    try {
      const stuff = await StuffModel.findById(data._id);
      if (!stuff) {
        throw Error("Stuff with this id is not found");
      }
      const report = await ReportModel.findById(stuff.reportId);
      if (report?.reporterId !== payload.userId || !payload.isAdmin) {
        throw Error(
          "Only creator of this report/stuff can add or modify this report/stuff"
        );
      }
      const saved = await StuffModel.findOneAndUpdate(
        { _id: data._id },
        { ...data }
      );
      if (!saved) {
        throw Error("Stuff with this id is not exist, please create one");
      }
      return saved;
    } catch (error) {
      return error.message;
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
      if (report.reporterId !== payload.userId || !payload.isAdmin) {
        throw Error(
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

  @Query(() => [Stuff], { nullable: true })
  async getInventory() {
    try {
      const items = await StuffModel.find({ type: StuffType.STATIONARY });
      return items;
    } catch (error) {
      return error.message;
    }
  }
}
