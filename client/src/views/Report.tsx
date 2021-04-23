import {
  Box,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { FaCheck } from "react-icons/fa";
import { useParams } from "react-router";
import { useGetReportQuery } from "../generated/graphql";
import { formatDate } from "../helpers/dateFormatter";
import { useDispatch, useSelector } from "../store";
import { setError } from "../store/slices/error";
import { getLocale } from "../store/slices/locale";

export default function ReportPage() {
  const locale = useSelector(getLocale);
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useGetReportQuery({
    variables: { id },
  });
  if (error) {
    dispatch(setError(error.message));
  }
  return (
    <Box minH="80vh" px="4">
      {!data || loading ? (
        <Spinner position="absolute" inset="96" mx="auto" />
      ) : !data.getReport ? (
        <Text>Cannot get Report</Text>
      ) : (
        <Box>
          <Flex w="full" display="flex" justify="space-between" align="center">
            <Box>
              <Heading fontSize="24" display="flex">
                Report: {data.getReport.name}
              </Heading>
              <Text>ID: {id}</Text>
              <Text fontSize="16" color="yellow.400">
                {data.getReport.type}
              </Text>
            </Box>
            <Flex align="center">
              <Box>
                <Text>Created at</Text>
                <Text>{formatDate(data.getReport.createdAt, locale)}</Text>
              </Box>
              <Box mx="8">
                <Text>Updated at</Text>
                <Text>{formatDate(data.getReport.updatedAt, locale)}</Text>
              </Box>
            </Flex>
          </Flex>
          <Box fontSize="24" mt="8">
            <Heading>Reporter: {data.getReport.reporter.name}</Heading>
            <Heading>Detail: </Heading>
            <Box>
              <List>
                {data.getReport.goods.map((item) => (
                  <ListItem key={item._id}>
                    <ListIcon color="green.300" as={FaCheck} />
                    {item.name}
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
