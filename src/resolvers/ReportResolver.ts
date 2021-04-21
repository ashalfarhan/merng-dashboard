import { Report, ReportModel } from "../entity/Report";
import { UserModel } from "../entity/User";
import {
  Query,
  Arg,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
  Ctx,
} from "type-graphql";
import { CreateInput, EditInput, MyContext } from "../utils/@types";
import { isAuth } from "../utils/middleware/isAuth";
import { ReportType } from "../utils/@types/enums";

@Resolver(() => Report)
export default class ReportResolver {
  @FieldResolver()
  async reporter(@Root() { reporterId }: Report) {
    if (!reporterId) return null;
    const user = await UserModel.findOne({ _id: reporterId });
    return user;
  }

  @Mutation(() => Report, { nullable: true })
  @UseMiddleware(isAuth)
  async createReport(
    @Ctx() { payload }: MyContext,
    @Arg("name") name: string,
    @Arg("data") data: CreateInput,
    @Arg("type") type: ReportType
  ) {
    if (!payload) {
      return Error("You should be a user to create a report");
    }
    try {
      const newReport = await ReportModel.create({
        name,
        type,
        reporterId: payload.userId,
        detail: { ...data },
      });
      await newReport.save();
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
    @Arg("data") data: EditInput
  ) {
    if (!payload) {
      return Error("Must be a user to edit a report");
    }
    try {
      const saved = await ReportModel.findOneAndUpdate(
        { "detail._id": data._id },
        {
          detail: {
            ...data,
          },
        }
      );
      if (!saved) {
        return Error("Report with this id is not exist, please create one");
      }
      return saved;
    } catch (error) {
      return error.message;
    }
  }

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
