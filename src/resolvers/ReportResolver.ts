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
  async deleteReport(@Arg("id") id: string) {
    try {
      const deleted = await ReportModel.findByIdAndDelete(id);
      return deleted;
    } catch (error) {
      return error.message;
    }
  }

  @Mutation(() => Report)
  @UseMiddleware(isAuth)
  async editReport(
    @Ctx() { payload }: MyContext,
    @Arg("data") data: EditReportInput
  ) {
    if (!payload) {
      return Error("Must be a user to edit a report");
    }
    try {
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
  async getReport(@Arg("id") id: string) {
    try {
      const report = await ReportModel.findById(id);
      if (!report) return Error(`There's no report with this ${id}`);
      return report;
    } catch (error) {
      return error.message;
    }
  }
}
