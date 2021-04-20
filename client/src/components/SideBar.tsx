import { Button } from "@chakra-ui/button";
import { Box, VStack } from "@chakra-ui/layout";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";

export default function SideBar() {
  const history = useHistory();
  const handleNav = (e: string) => {
    history.push(e);
  };
  return (
    <Box h="full">
      <VStack
        display="flex"
        flexDir="column"
        alignItems="stretch"
        spacing="24px"
        py="24px"
      >
        <Button onClick={() => handleNav("/dashboard")}>
          <FormattedMessage id="menu.overview" />
        </Button>
        <Button onClick={() => handleNav("/dashboard/reports")}>
          <FormattedMessage id="menu.allReports" />
        </Button>
        <Button onClick={() => handleNav("/dashboard/users")}>
          <FormattedMessage id="menu.allUsers" />
        </Button>
        <Button>Sale</Button>
        <Button>Stock</Button>
      </VStack>
    </Box>
  );
}
