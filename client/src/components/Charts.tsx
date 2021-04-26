import { Box, Text } from "@chakra-ui/layout";
import {
  LineChart,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { OVERVIEW } from "../@types/enums";
import { Spinner } from "@chakra-ui/spinner";
import { useGetSalesQuery } from "../generated/graphql";
import { getChartData } from "../helpers/getChartData";

export default function Charts({ display }: { display: OVERVIEW }) {
  const { data, loading } = useGetSalesQuery();
  if (loading || !data) {
    return (
      <Box
        height={400}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner />
      </Box>
    );
  }
  const { displayData } = getChartData({ data: data.getSales, type: "REPORT" });
  return (
    <Box height="60vh">
      <Text align="center">Among 2021</Text>
      <ResponsiveContainer width={"100%"} height="80%">
        <LineChart
          data={displayData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="createdAt" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={display} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
