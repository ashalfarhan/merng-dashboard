import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableCaption,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import moment from "moment";
import { FaCheck } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { useIntl } from "react-intl";
import { useParams } from "react-router";
import EditReportModal from "../components/modals/EditReportModal";
import { useGetReportQuery } from "../generated/graphql";
import { formatDate } from "../helpers/dateFormatter";
import { useDispatch, useSelector } from "../store";
import { setError } from "../store/slices/error";
import { getLocale } from "../store/slices/locale";

export default function ReportPage() {
  const { formatMessage } = useIntl();
  const locale = useSelector(getLocale);
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <Flex
            borderBottom="2px"
            pb="2"
            w="full"
            display="flex"
            justify="space-between"
            align="center"
          >
            <Box>
              <Heading fontSize="24" display="flex">
                {formatMessage({ id: "report.reportLabel" }) +
                  ": " +
                  data.getReport.name}
              </Heading>
              <Text>ID: {id}</Text>
              <Text fontSize="16" color="yellow.400">
                {data.getReport.type}
              </Text>
            </Box>
            <Flex align="center">
              <Box>
                <Text>{formatMessage({ id: "report.createdAtLabel" })}</Text>
                <Text>{formatDate(data.getReport.createdAt, locale)}</Text>
              </Box>
              <Box mx="8">
                <Text>{formatMessage({ id: "report.updatedAtLabel" })}</Text>
                <Text>{formatDate(data.getReport.updatedAt, locale)}</Text>
              </Box>
            </Flex>
          </Flex>
          <Box fontSize="24" mt="8">
            <Flex
              pb="4"
              borderBottom="1px"
              borderColor="yellow"
              justify="space-between"
              align="center"
            >
              <Heading fontSize="32">
                {formatMessage({ id: "report.reporterLabel" }) +
                  ": " +
                  data.getReport.reporter.name}
              </Heading>
              <Button onClick={onOpen} variant="solid" colorScheme="yellow">
                <EditReportModal
                  isOpen={isOpen}
                  onClose={onClose}
                  data={{
                    id,
                    type: data.getReport.type,
                    name: data.getReport.name,
                  }}
                />
                <AiOutlineEdit style={{ marginRight: "4px" }} />
                {formatMessage({ id: "menu.editReportLabel" })}
              </Button>
            </Flex>
            <Flex
              pb="4"
              borderBottom="1px"
              borderColor="green.500"
              justify="space-between"
              align="center"
            >
              <Heading mt="8" mb="4" fontSize="24">
                Detail Stuff:
              </Heading>
              <Button onClick={onOpen} variant="solid" colorScheme="green">
                <EditReportModal
                  isOpen={isOpen}
                  onClose={onClose}
                  data={{
                    id,
                    type: data.getReport.type,
                    name: data.getReport.name,
                  }}
                />
                <AiOutlineEdit style={{ marginRight: "4px" }} />
                {formatMessage({ id: "menu.addStuffLabel" })}
              </Button>
            </Flex>
            <Box>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>No.</Th>
                    <Th w="xl">{formatMessage({ id: "report.nameLabel" })}</Th>
                    <Th>{formatMessage({ id: "stuff.amountLabel" })}</Th>
                    <Th>{formatMessage({ id: "stuff.priceLabel" })}</Th>
                    <Th w="3xs">
                      {formatMessage({ id: "report.reportedOnLabel" })}
                    </Th>
                    <Th w="3xs">
                      {formatMessage({ id: "report.updatedAtLabel" })}
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.getReport.goods.map((stuff) => (
                    <Tr key={stuff._id}>
                      <Td>
                        <FaCheck color="green" />
                      </Td>
                      <Td>{stuff.name}</Td>
                      <Td>{stuff.amount}</Td>
                      <Td>{stuff.price}</Td>
                      <Td>
                        {moment(stuff.createdAt).format("ddd DD-MM-YYYY")}
                      </Td>
                      <Td>
                        {moment(stuff.updatedAt).format("ddd DD-MM-YYYY")}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
                <TableCaption>
                  {formatMessage({ id: "lastUpdateLabel" }) +
                    " " +
                    new Date().toLocaleString()}
                </TableCaption>
              </Table>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
