import { Box } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
// import { FormattedMessage } from "react-intl";
import Layout from "../components/Layout";

export default function Inventory() {
  return (
    <Layout>
      <Box>
        <Heading>
          {/* <FormattedMessage id="overview.heading" /> */}
          Inventory Page
        </Heading>
      </Box>
    </Layout>
  );
}
