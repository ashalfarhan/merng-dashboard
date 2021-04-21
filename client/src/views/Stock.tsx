// import { FormattedMessage } from "react-intl";
import { Box, Heading } from "@chakra-ui/layout";
import Layout from "../components/Layout";

export default function Stock() {
  return (
    <Layout>
      <Box>
        <Heading>
          {/* <FormattedMessage id="overview.heading" /> */}
          Stock Page
        </Heading>
      </Box>
    </Layout>
  );
}
