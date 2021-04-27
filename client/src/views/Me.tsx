import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useIntl } from "react-intl";
import { useMeQuery } from "../generated/graphql";
import { useDispatch } from "../store";
import { setError } from "../store/slices/error";
import MyReportsTable from "../components/tables/MyReportsTable";

export default function MePage() {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const { data, loading } = useMeQuery({
    onError: (e) => {
      dispatch(setError(e.message));
    },
  });
  return (
    <Box display="flex" minH="100vh">
      {!data || loading ? (
        <Spinner m="auto" />
      ) : (
        <Box width="full">
          <Heading textAlign="center">
            {formatMessage({ id: "settings.account" })}
          </Heading>
          <Flex align="center" flexDirection="column" justify="center" mt="8">
            <Avatar mx="auto" mb="4" size="xl" />
            <Text>{data.me?.name}</Text>
          </Flex>
          <Tabs mt="6" isFitted variant="line">
            <TabList>
              <Tab>{formatMessage({ id: "account.about.label" })}</Tab>
              <Tab>{formatMessage({ id: "account.myReports.label" })}</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box p="4">
                  <Text>Email: </Text>
                  <Text>{data.me?.email}</Text>
                  <Text>Username: </Text>
                  <Text>{data.me?.username}</Text>
                </Box>
              </TabPanel>
              <TabPanel>
                <MyReportsTable data={data} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )}
    </Box>
  );
}
