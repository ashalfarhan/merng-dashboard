import { Button } from "@chakra-ui/button";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { useIntl } from "react-intl";
import { Link, useLocation } from "react-router-dom";

export default function Page404() {
  const { formatMessage } = useIntl();
  const { pathname } = useLocation();
  return (
    <Box px="12" mt="8" minH="80vh">
      <Heading>404 Not Found</Heading>
      <Heading>
        {"Oops" +
          formatMessage({ id: "notFound.heading" }) +
          " " +
          { pathname }}
      </Heading>
      <Text>
        {formatMessage({ id: "notFound.content.main" }) + " "}
        <Button variant="link">
          {" "}
          <Link to="/">{formatMessage({ id: "notFound.content.sub" })}</Link>
        </Button>
      </Text>
    </Box>
  );
}
