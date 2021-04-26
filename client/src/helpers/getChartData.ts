import { Maybe } from "../generated/graphql";

export const getChartData = ({
  data,
  type,
}: {
  data: Maybe<any>;
  type: "REPORT" | "STUFF";
}) => {
  let displayData;

  if (type === "STUFF") {
    displayData = data
      .map((item: any) => ({ ...item, createdAt: new Date(item.createdAt) }))
      .sort(
        (prev: any, next: any) =>
          next.createdAt.getMonth() - prev.createdAt.getMonth()
      )
      .map((good: any) => good.amount)
      .reduce((prev: any, curr: any) => prev + curr);
  }
  displayData = data
    .map((item: any) => ({
      ...item,
      month: new Date(item.createdAt).getMonth(),
    }))
    .sort((prev: any, next: any) => next.month - prev.month)
    .map((item: any) => ({
      amount: item.goods
        .map((good: any) => good.amount)
        .reduce((prev: any, curr: any) => prev + curr),
      income: item.goods
        .map((good: any) => good.price)
        .reduce((prev: any, curr: any) => prev + curr),
      createdAt:
        new Date(item.createdAt).getMonth() +
        "/" +
        new Date(item.createdAt).getFullYear(),
    }));
  return { displayData };
};
