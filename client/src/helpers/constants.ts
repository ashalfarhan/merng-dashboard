import { ReportType, StuffType } from "../generated/graphql";

export const StuffOptions = [
  {
    label: "stuff.type.foodsLabel",
    value: StuffType.Foods,
  },
  {
    label: "stuff.type.othersLabel",
    value: StuffType.Others,
  },
  {
    label: "stuff.type.personalLabel",
    value: StuffType.Personal,
  },
  {
    label: "stuff.type.stationaryLabel",
    value: StuffType.Stationary,
  },
];

export const ReportOptions = [
  {
    label: "report.type.purchase",
    value: ReportType.Purchase,
  },
  {
    label: "report.type.sell",
    value: ReportType.Sell,
  },
  {
    label: "report.type.wholesale",
    value: ReportType.Wholesale,
  },
];
