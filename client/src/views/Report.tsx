import {
  Box,
  Flex,
  Heading,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spinner,
  TableCaption,
} from "@chakra-ui/react";
import moment from "moment";
import { FaCheck } from "react-icons/fa";
// import { useIntl } from "react-intl";
import { useParams } from "react-router";
import { useGetReportQuery } from "../generated/graphql";
import { formatDate } from "../helpers";
import { useAppDispatch } from "../store";
import { setError } from "../store/slices/error";
// import { getLocale } from "../store/slices/locale";
import {
  EditReportSection,
  DetailStuffHeading,
} from "../components/HeadingSection";
import { useLocale } from "../context/LocaleContext";

export default function ReportPage() {
  // const { t } = useIntl();
  // const locale = useAppSelector(getLocale);
  const { locale, t } = useLocale();
  const dispatch = useAppDispatch();
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
                {t({ id: "report.reportLabel" }) + ": " + data.getReport.name}
              </Heading>
              <Text>ID: {id}</Text>
              <Text fontSize="16" color="yellow.400">
                {data.getReport.type}
              </Text>
            </Box>
            <Flex align="center">
              <Box>
                <Text>{t({ id: "report.createdAtLabel" })}</Text>
                <Text>{formatDate(data.getReport.createdAt, locale)}</Text>
              </Box>
              <Box mx="8">
                <Text>{t({ id: "report.updatedAtLabel" })}</Text>
                <Text>{formatDate(data.getReport.updatedAt, locale)}</Text>
              </Box>
            </Flex>
          </Flex>
          <Box fontSize="24" mt="8">
            <EditReportSection
              reportId={id}
              reportName={data.getReport?.name}
              reportType={data.getReport?.type}
              reporterName={data.getReport?.reporter.name}
            />
            <DetailStuffHeading reportId={id} />
            <Box>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>No.</Th>
                    <Th w="xl">{t({ id: "report.nameLabel" })}</Th>
                    <Th>{t({ id: "stuff.amountLabel" })}</Th>
                    <Th>{t({ id: "stuff.priceLabel" })}</Th>
                    <Th w="3xs">{t({ id: "report.reportedOnLabel" })}</Th>
                    <Th w="3xs">{t({ id: "report.updatedAtLabel" })}</Th>
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
                  {t({ id: "lastUpdateLabel" }) +
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
