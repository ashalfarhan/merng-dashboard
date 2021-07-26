import {
  Spinner,
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useMeQuery } from "../generated/graphql";
import { useAppDispatch } from "../store";
import { setError } from "../store/slices/error";
import MyReportsTable from "../components/tables/MyReportsTable";
import { useLocale } from "../context/LocaleContext";

export default function MePage() {
  const { t } = useLocale();
  const dispatch = useAppDispatch();
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
          <Heading textAlign="center">{t({ id: "settings.account" })}</Heading>
          <Flex align="center" flexDirection="column" justify="center" mt="8">
            <Avatar mx="auto" mb="4" size="xl" />
            <Text>{data.me?.name}</Text>
          </Flex>
          <Tabs mt="6" isFitted variant="line">
            <TabList>
              <Tab>{t({ id: "account.about.label" })}</Tab>
              <Tab>{t({ id: "account.myReports.label" })}</Tab>
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
