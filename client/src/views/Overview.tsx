import { Box, Flex, Heading } from "@chakra-ui/layout";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useState } from "react";
import { useIntl } from "react-intl";
import { ImStatsDots } from "react-icons/im";
import { RiBuilding4Line } from "react-icons/ri";
import { FaDolly } from "react-icons/fa";
import SalesCharts from "../components/charts/IncomeCharts";
import SpendingCharts from "../components/charts/SpendingChats";
import Layout from "../components/common/Layout";

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
