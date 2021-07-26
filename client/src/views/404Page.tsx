import { Button, Box, Heading, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useLocale } from "../context/LocaleContext";

export default function Page404() {
  const { t } = useLocale();
  const { pathname } = useLocation();
  return (
    <Box px="12" mt="8" minH="80vh">
      <Heading>404 Not Found</Heading>
      <Heading>
        {"Oops " + t({ id: "notFound.heading" }) + " " + pathname}
      </Heading>
      <Text>
        {t({ id: "notFound.content.main" }) + " "}
        <Button variant="link">
          {" "}
          <Link to="/">{t({ id: "notFound.content.sub" })}</Link>
        </Button>
      </Text>
    </Box>
  );
}
