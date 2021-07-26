import { Button } from "@chakra-ui/button";
import { Box, VStack } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import { useIntl } from "react-intl";
import { useHistory } from "react-router";
import { useAppSelector } from "../store";
import { getUser } from "../store/slices/auth";
import CreateReportModal from "./modals/CreateReportModal";

export default function SideBar() {
  const history = useHistory();
  const { formatMessage } = useIntl();
  const user = useAppSelector(getUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          {formatMessage({ id: "menu.overview" })}
        </Button>
        <Button onClick={() => handleNav("/dashboard/reports")}>
          {formatMessage({ id: "menu.allReports" })}
        </Button>
        {user?.isAdmin && (
          <>
            <Button onClick={() => handleNav("/dashboard/users")}>
              {formatMessage({ id: "menu.allUsers" })}
            </Button>
            <Button onClick={() => handleNav("/dashboard/sales")}>
              {formatMessage({ id: "menu.sales" })}
            </Button>
          </>
        )}
        <Button onClick={() => handleNav("/dashboard/stock")}>
          {formatMessage({ id: "menu.stock" })}
        </Button>
        <Button onClick={() => handleNav("/dashboard/inventory")}>
          {formatMessage({ id: "menu.inventory" })}
        </Button>
        <Button onClick={onOpen}>
          <CreateReportModal isOpen={isOpen} onClose={onClose} />
          {formatMessage({ id: "menu.createReportLabel" })}
        </Button>
      </VStack>
    </Box>
  );
}
