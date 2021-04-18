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

@Resolver(() => Report)
export default class ReportResolver {
  @FieldResolver()
  async reporter(@Root() { reporterId }: Report) {
    if (!reporterId) return null;
    const user = await UserModel.findOne({ _id: reporterId });
    return user;
  }

  @Mutation(() => Report)
  async createReport(
    @Arg("name") name: string,
    @Arg("data") data: CreateInput,
    @Arg("reporterId", { nullable: true }) reporterId?: string,
    @Arg("createdAt", { nullable: true }) createdAt?: Date
  ) {
    try {
      const newReport = await ReportModel.create({
        name,
        createdAt,
        reporterId,
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
  async editReport(@Arg("id") id: string, @Arg("data") data: EditInput) {
    // const before = await ReportModel.findById(id);
    // console.log("before saved: ", before);
    const after = await ReportModel.findByIdAndUpdate(
      id,
      { ...data },
      {
        new: true,
      }
    );
    if (!after) {
      return Error("Report with this id is not exist, please create one");
    }
    await after.save();
    // console.log("after saved: ", after);
    return after;
  }

  @Query(() => [Report], { nullable: true })
  @UseMiddleware(isAuth)
  async getAllReports(@Ctx() { payload }: MyContext) {
    if (!payload) {
      return null;
    }
    if (!payload.isAdmin) {
      return Error("Must be an admin");
    }
    try {
      const reports = await ReportModel.find();
      return reports;
    } catch (error) {
      return error.message;
    }
  }

  @Query(() => Report)
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
