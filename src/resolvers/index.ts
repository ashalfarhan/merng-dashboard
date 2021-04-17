import { Resolver, Query } from "type-graphql";
import UserResolver from "./UserResolver";
import ReportResolver from "./ReportResolver";

@Resolver()
export class Main {
  @Query(() => String)
  hello() {
    return "Hello from graphql!";
  }
}
export const resolvers = [Main, UserResolver, ReportResolver] as const;
