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
        type=""
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          y: {
            ticks: {
              callback: (val: number) => {
                return `$${val}`;
              },
            },
          },
        }}
        data={{
          labels: [
            "Jan",
            "Feb",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "Sept",
            "Oct",
            "Nov",
            "Desc",
          ],
          datasets: [
            {
              label: "Last 2021",
              data: data,
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
            },
          ],
        }}
      />
    </Box>
  );
}
