import {
  Box,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { ImStatsDots } from "react-icons/im";
import { RiBuilding4Line } from "react-icons/ri";
import { FaDolly } from "react-icons/fa";
import { Layout } from "../components/common";
import { useLocale } from "../context/LocaleContext";
import Loadable from "react-loadable";

const SalesCharts = Loadable({
  loader: () => import("../components/charts/IncomeCharts"),
  loading: Spinner,
});
const SpendingCharts = Loadable({
  loader: () => import("../components/charts/SpendingChats"),
  loading: Spinner,
});

export default function Overview() {
  const { t } = useLocale();
  const [display, setDisplay] = useState("SALES");
  return (
    <Layout>
      <Box>
        <Flex justify="space-between" align="center">
          <Heading>{t({ id: "overview.heading" })}</Heading>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<ImStatsDots />}
              variant="outline"
            />
            <MenuList>
              <MenuItem
                icon={<RiBuilding4Line />}
                onClick={() => setDisplay("SPENDS")}
              >
                Inventory
              </MenuItem>
              <MenuItem icon={<FaDolly />} onClick={() => setDisplay("SALES")}>
                Sales
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        {display === "SALES" ? <SalesCharts /> : <SpendingCharts />}
      </Box>
    </Layout>
  );
}
