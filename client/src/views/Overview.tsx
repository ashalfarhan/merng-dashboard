import { Button } from "@chakra-ui/button";
import { Box, Heading, Stack } from "@chakra-ui/layout";
import { useState } from "react";
import { useIntl } from "react-intl";
import { OVERVIEW } from "../@types/enums";
import Charts from "../components/Charts";
import Layout from "../components/common/Layout";

export default function Overview() {
  const { formatMessage } = useIntl();
  const [display, setDisplay] = useState(OVERVIEW.INCOME);
  return (
    <Layout>
      <Box>
        <Heading>{formatMessage({ id: "overview.heading" })}</Heading>
        <Charts display={display} />
        <Stack direction="row" spacing="4" justifyContent="center" mt="12">
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => setDisplay(OVERVIEW.INCOME)}
          >
            Income
          </Button>
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => setDisplay(OVERVIEW.AMOUNT)}
          >
            Amount
          </Button>
        </Stack>
      </Box>
    </Layout>
  );
}
