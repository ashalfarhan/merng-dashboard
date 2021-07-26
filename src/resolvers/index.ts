import { Resolver, Query } from "type-graphql";
import UserResolver from "./UserResolver";
import ReportResolver from "./ReportResolver";
import { StuffResolver } from "./StuffResolver";

@Resolver()
export class Main {
  @Query(() => String)
  hello() {
    return "Hello from graphql!";
  }
}

export const resolvers = [
  Main,
  UserResolver,
  ReportResolver,
  StuffResolver,
] as const;
