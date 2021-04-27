import {
  Query,
  Arg,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
  Ctx,
  Args,
} from "type-graphql";
import { ReportType } from "../utils/@types/enums";
import { Stuff, StuffModel } from "../entity/Stuff";
import { Report, ReportModel } from "../entity/Report";
import { UserModel } from "../entity/User";
import { CreateReportArgs, EditReportInput, MyContext } from "../utils/@types";
import { isAuth } from "../utils/middleware/isAuth";

@Resolver(() => Report)
export default class ReportResolver {
  /**
   * @returns FieldResolvers
   */
  @FieldResolver()
  async reporter(@Root() { reporterId }: Report) {
    if (!reporterId) return null;
    const user = await UserModel.findOne({ _id: reporterId });
    return user;
  }

  @FieldResolver(() => [Stuff], { nullable: true })
  async goods(@Root() { _id }: Report) {
    const stuffs = await StuffModel.find({ reportId: _id });
    return stuffs;
  }

  /**
   * @returns Mutations
   */
  @Mutation(() => Report, { nullable: true })
  @UseMiddleware(isAuth)
  async createReport(
    @Ctx() { payload }: MyContext,
    @Args() { data, name, type }: CreateReportArgs
  ) {
    if (!payload) {
      return Error("You should be a user to create a report");
    }
    try {
      const newReport = await ReportModel.create({
        name,
        type,
        reporterId: payload.userId,
      });
      await newReport.save();
      const newStuff = await StuffModel.create({
        ...data,
        reportId: newReport._id,
      });
      await newStuff.save();
      return newReport;
    } catch (error) {
      return error.message;
    }
  }

  @Mutation(() => Report, { nullable: true })
  @UseMiddleware(isAuth)
  async deleteReport(@Ctx() { payload }: MyContext, @Arg("id") id: string) {
    if (!payload) {
      return Error("Please login");
    }
    try {
      const report = await ReportModel.findById(id);
      if (!report) {
        return Error(
          "There's no report with this id, or probably it's already deleted"
        );
      }
      if (payload.userId !== report.reporterId) {
        return Error("Only the creator of this report can delete this report");
      }
      const deleted = await ReportModel.findByIdAndDelete(id);
      return deleted;
    } catch (error) {
      return error.message;
    }
  }

  @Mutation(() => Report, { nullable: true })
  @UseMiddleware(isAuth)
  async editReport(
    @Ctx() { payload }: MyContext,
    @Arg("data") data: EditReportInput
  ) {
    if (!payload) {
      return Error("Must be a user to edit a report");
    }
    try {
      const report = await ReportModel.findById(data._id);
      if (!report) {
        return Error("Cannot get the report");
      }
      if (report.reporterId !== payload.userId || !payload.isAdmin) {
        return Error("Only Admin can edit any report or the reporter itself");
      }
      const saved = await ReportModel.findOneAndUpdate(
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

  /**
   * @returns Queries
   */
  @Query(() => [Report], { nullable: true })
  @UseMiddleware(isAuth)
  async getAllReports(@Ctx() { payload }: MyContext) {
    if (!payload) {
      return null;
    }
    try {
      const reports = await ReportModel.find();
      return reports;
    } catch (error) {
      return error.message;
    }
  }

  @Query(() => Report, { nullable: true })
  @UseMiddleware(isAuth)
  async getReport(@Ctx() { payload }: MyContext, @Arg("id") id: string) {
    if (!payload) {
      return null;
    }
    try {
      const report = await ReportModel.findById(id);
      if (!report) return Error(`There's no report with this ${id}`);
      return report;
    } catch (error) {
      return error.message;
    }
  }

  @Query(() => [Report], { nullable: true })
  @UseMiddleware(isAuth)
  async getStock(@Ctx() { payload }: MyContext) {
    if (!payload) {
      return null;
    }
    try {
      const items = await ReportModel.find({ type: ReportType.WHOLESALE });
      return items;
    } catch (error) {
      return error.message;
    }
  }

  @Query(() => [Report], { nullable: true })
  @UseMiddleware(isAuth)
  async getSales(@Ctx() { payload }: MyContext) {
    if (!payload) {
      return null;
    }
    try {
      if (!payload.isAdmin) {
        return Error("This is only admin features");
      }
      const items = await ReportModel.find({ type: ReportType.SELL });
      return items;
    } catch (error) {
      return error.message;
    }
  }
}
