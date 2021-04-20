import { Line } from "react-chartjs-2";
import { Box } from "@chakra-ui/layout";
import { useFetch } from "../helpers/useFetch";
import { OVERVIEW } from "../@types/enums";
import { Spinner } from "@chakra-ui/spinner";

export default function Charts({ display }: { display: OVERVIEW }) {
  const { data, loading } = useFetch(display, 24);
  if (loading) {
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
  return (
    <Box>
      <Line
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
        }}
        data={{
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of Votes",
              data: data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                // "rgba(54, 162, 235, 0.2)",
                // "rgba(255, 206, 86, 0.2)",
                // "rgba(75, 192, 192, 0.2)",
                // "rgba(153, 102, 255, 0.2)",
                // "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                // "rgba(54, 162, 235, 1)",
                // "rgba(255, 206, 86, 1)",
                // "rgba(75, 192, 192, 1)",
                // "rgba(153, 102, 255, 1)",
                // "rgba(255, 159, 64, 1)",
              ],
            },
          ],
        }}
      />
    </Box>
  );
}
