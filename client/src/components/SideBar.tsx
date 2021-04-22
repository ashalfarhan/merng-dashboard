import { Button } from "@chakra-ui/button";
import { Box, VStack } from "@chakra-ui/layout";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";
import { useSelector } from "../store";
import { getUser } from "../store/slices/auth";

export default function SideBar() {
  const history = useHistory();
  const user = useSelector(getUser);
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
        {user?.isAdmin && (
          <Button onClick={() => handleNav("/dashboard/users")}>
            <FormattedMessage id="menu.allUsers" />
          </Button>
        )}
        <Button onClick={() => handleNav("/dashboard/stock")}>
          <FormattedMessage id="menu.stock" />
        </Button>
        <Button onClick={() => handleNav("/dashboard/sales")}>
          <FormattedMessage id="menu.sales" />
        </Button>
        <Button onClick={() => handleNav("/dashboard/inventory")}>
          <FormattedMessage id="menu.inventory" />
        </Button>
      </VStack>
    </Box>
  );
}
