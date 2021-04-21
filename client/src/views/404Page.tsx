import { Button } from "@chakra-ui/button";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { FormattedMessage } from "react-intl";
import { Link, useLocation } from "react-router-dom";

export default function Page404() {
  const { pathname } = useLocation();
  return (
    <Box px="12" mt="8" minH="80vh">
      <Heading>404 Not Found</Heading>
      <Heading>
        Oops, <FormattedMessage id="notFound.heading" /> {pathname}
      </Heading>
      <Text>
        <FormattedMessage id="notFound.content.main" />{" "}
        <Button variant="link">
          {" "}
          <Link to="/">
            <FormattedMessage id="notFound.content.sub" />
          </Link>
        </Button>
      </Text>
    </Box>
  );
}
