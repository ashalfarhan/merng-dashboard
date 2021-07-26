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
import Loadable from "react-loadable";
import { useIntl } from "react-intl";

const SalesCharts = Loadable({
  loader: () => import("../components/charts/IncomeCharts"),
  loading: Spinner,
});
const SpendingCharts = Loadable({
  loader: () => import("../components/charts/SpendingChats"),
  loading: Spinner,
});

export default function Overview() {
  const { formatMessage } = useIntl();
  const [display, setDisplay] = useState("SALES");
  return (
    <Layout>
      <Box>
        <Flex justify="space-between" align="center">
          <Heading>{formatMessage({ id: "overview.heading" })}</Heading>
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
