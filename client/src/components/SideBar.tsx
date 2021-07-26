import { Button } from "@chakra-ui/button";
import { Box, VStack } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { useLocale } from "../context/LocaleContext";
import { useAppSelector } from "../store";
import { getUser } from "../store/slices/auth";
import CreateReportModal from "./modals/CreateReportModal";

export default function SideBar() {
  const history = useHistory();
  const { t } = useLocale();
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
          {t({ id: "menu.overview" })}
        </Button>
        <Button onClick={() => handleNav("/dashboard/reports")}>
          {t({ id: "menu.allReports" })}
        </Button>
        {user?.isAdmin && (
          <>
            <Button onClick={() => handleNav("/dashboard/users")}>
              {t({ id: "menu.allUsers" })}
            </Button>
            <Button onClick={() => handleNav("/dashboard/sales")}>
              {t({ id: "menu.sales" })}
            </Button>
          </>
        )}
        <Button onClick={() => handleNav("/dashboard/stock")}>
          {t({ id: "menu.stock" })}
        </Button>
        <Button onClick={() => handleNav("/dashboard/inventory")}>
          {t({ id: "menu.inventory" })}
        </Button>
        <Button onClick={onOpen}>
          <CreateReportModal isOpen={isOpen} onClose={onClose} />
          {t({ id: "menu.createReportLabel" })}
        </Button>
      </VStack>
    </Box>
  );
}
