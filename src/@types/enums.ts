import { registerEnumType } from "type-graphql";

export enum ReportType {
  WHOLESALE = "WHOLESALE",
  PURCHASE = "PURCHASE",
  SELL = "SELL",
}

export enum StuffType {
  STATIONARY = "STATIONARY",
  FOODS = "FOODS",
  PERSONAL = "PERSONAL",
  OTHERS = "OTHERS",
}

registerEnumType(ReportType, {
  name: "ReportType",
  description: "Type of report that will be submitted",
});

registerEnumType(StuffType, {
  name: "StuffType",
  description: "Type of stuff that will be submitted",
});
