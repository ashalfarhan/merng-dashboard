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
import { UserModel, Report, ReportModel, Stuff, StuffModel } from "../entity";
import {
  ReportType,
  CreateReportArgs,
  EditReportInput,
  MyContext,
} from "../@types";
import { isAuth } from "../utils";

@Resolver(() => Report)
export default class ReportResolver {
  @FieldResolver()
  async reporter(@Root() { reporterId }: Report) {
    if (!reporterId) {
      return null;
    }
    const user = await UserModel.findOne({ _id: reporterId });
    return user;
  }

  @FieldResolver(() => [Stuff], { nullable: true })
  async goods(@Root() { _id }: Report) {
    const stuffs = await StuffModel.find({ reportId: _id });
    return stuffs;
  }

  @Mutation(() => Report, { nullable: true })
  @UseMiddleware(isAuth)
  async createReport(
    @Ctx() { payload }: MyContext,
    @Args() { data, name, type }: CreateReportArgs,
  ) {
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
      return error;
    }
  }

  @Mutation(() => Report, { nullable: true })
  @UseMiddleware(isAuth)
  async deleteReport(@Ctx() { payload }: MyContext, @Arg("id") id: string) {
    try {
      const report = await ReportModel.findById(id);
      if (!report) {
        throw Error(
          "There's no report with this id, or probably it's already deleted",
        );
      }
      if (payload.userId !== report.reporterId) {
        throw Error("Only the creator of this report can delete this report");
      }
      const deleted = await ReportModel.findByIdAndDelete(id);
      return deleted;
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => Report, { nullable: true })
  @UseMiddleware(isAuth)
  async editReport(
    @Ctx() { payload }: MyContext,
    @Arg("data") data: EditReportInput,
  ) {
    try {
      const report = await ReportModel.findById(data._id);
      if (!report) {
        throw Error("Cannot get the report");
      }
      if (report.reporterId === payload.userId || payload.isAdmin) {
        const { _id, ...rest } = data;
        const saved = await ReportModel.findByIdAndUpdate(_id, {
          ...rest,
        });
        if (!saved) {
          throw Error("Report with this id is not exist, please create one");
        }
        return saved;
      }
      throw Error("Only Admin can edit any report or the reporter itself");
    } catch (error) {
      return error;
    }
  }

  @Query(() => [Report])
  @UseMiddleware(isAuth)
  async getAllReports() {
    try {
      const reports = await ReportModel.find();
      return reports;
    } catch (error) {
      return error;
    }
  }

  @Query(() => Report, { nullable: true })
  @UseMiddleware(isAuth)
  async getReport(@Arg("id") id: string) {
    try {
      const report = await ReportModel.findById(id);
      if (!report) {
        throw Error(`There's no report with the id of: ${id}`);
      }
      return report;
    } catch (error) {
      return error;
    }
  }

  @Query(() => [Report], { nullable: true })
  @UseMiddleware(isAuth)
  async getStock() {
    try {
      const items = await ReportModel.find({ type: ReportType.WHOLESALE });
      return items;
    } catch (error) {
      return error;
    }
  }

  @Query(() => [Report], { nullable: true })
  @UseMiddleware(isAuth)
  async getSales(@Ctx() { payload }: MyContext) {
    try {
      if (!payload.isAdmin) {
        throw Error("This is only admin features");
      }
      const items = await ReportModel.find({ type: ReportType.SELL });
      return items;
    } catch (error) {
      return error;
    }
  }
}
