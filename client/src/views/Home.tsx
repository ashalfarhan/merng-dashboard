import { Box, Heading, Text, Button } from "@chakra-ui/react";
// import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { useLocale } from "../context/LocaleContext";
import { useAppSelector } from "../store";
import { isAuth } from "../store/slices/auth";

export default function HomePage() {
  const { t } = useLocale();
  const isLoggedIn = useAppSelector(isAuth);
  return (
    <Box
      minH="60vh"
      display="flex"
      alignItems="center"
      flexDir="column"
      justifyContent="center"
    >
      <Heading textAlign="center">{t({ id: "welcome.title" })}</Heading>
      {isLoggedIn ? (
        <Text fontSize="24px" textAlign="center">
          {t({ id: "welcome.subTitle" }) + " "}
          <Button fontSize="24px" variant="link">
            <Link to="/dashboard">dashboard</Link>
          </Button>
        </Text>
      ) : (
        <Text fontSize="24px" textAlign="center">
          {t({ id: "welcome.please" }) + " "}
          <Button fontSize="24px" variant="link">
            <Link to="/login">login</Link>
          </Button>{" "}
          {t({ id: "welcome.ifContinue" })}
        </Text>
      )}
    </Box>
  );
}
