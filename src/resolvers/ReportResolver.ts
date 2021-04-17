import { Report, ReportModel } from "../entity/Report";
import { UserModel } from "../entity/User";
import { Arg, FieldResolver, Mutation, Resolver, Root } from "type-graphql";
import { CreateInput } from "../utils/@types";

@Resolver(() => Report)
export default class ReportResolver {
  @FieldResolver()
  async reporter(@Root() parent: Report) {
    if (!parent.reporterId) return null;
    const user = await UserModel.findOne({ _id: parent.reporterId });
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
      console.log(newReport);
      return newReport;
    } catch (error) {
      return error;
    }
  }
}
