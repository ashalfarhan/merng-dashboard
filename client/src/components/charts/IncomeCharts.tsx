import { Button, Spinner, Box, Stack, Text } from "@chakra-ui/react";
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
import { SALES } from "../../@types";
import { useGetSalesQuery } from "../../generated/graphql";
import { getChartData } from "../../helpers";
import { useAppDispatch } from "../../store";
import { setError } from "../../store/slices/error";
import { useState } from "react";

export default function SalesCharts() {
  const [display, setDisplay] = useState(SALES.INCOME);
  const dispatch = useAppDispatch();
  const { data, loading } = useGetSalesQuery({
    onError: (e) => {
      dispatch(setError(e.message));
    },
  });
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
      <Stack direction="row" spacing="4" justifyContent="center" mt="12">
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => setDisplay(SALES.INCOME)}
        >
          Income
        </Button>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => setDisplay(SALES.AMOUNT)}
        >
          Amount
        </Button>
      </Stack>
    </Box>
  );
}
