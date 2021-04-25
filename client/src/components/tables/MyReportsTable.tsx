import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import {
  GetAllReportsDocument,
  MeDocument,
  MeQuery,
  useDeleteReportMutation,
} from "../../generated/graphql";
import { formatDate } from "../../helpers/dateFormatter";
import { useDispatch, useSelector } from "../../store";
import { setError } from "../../store/slices/error";
import { getLocale } from "../../store/slices/locale";

interface Props {
  data: MeQuery | undefined;
}
export default function MyReportsTable({ data }: Props) {
  const dispatch = useDispatch();
  const [deleteReport, { loading }] = useDeleteReportMutation({
    onError: (e) => {
      dispatch(setError(e.message));
    },
    refetchQueries: [
      {
        query: GetAllReportsDocument,
      },
      { query: MeDocument },
    ],
  });
  const locale = useSelector(getLocale);
  if (!data) {
    return <span>There's no reports, please create one</span>;
  }
  const handleDelete = async (id: string) => {
    try {
      await deleteReport({
        variables: { id },
      });
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>No.</Th>
          <Th w="xl">
            <FormattedMessage id="report.nameLabel" />
          </Th>
          <Th>
            <FormattedMessage id="report.createdAtLabel" />
          </Th>
          <Th w="xs">
            <FormattedMessage id="report.actionLabel" />
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.me?.reports.map((report, idx) => (
          <Tr key={report._id}>
            <Td>{idx + 1}</Td>
            <Td>{report.name}</Td>
            <Td>{formatDate(report.createdAt, locale)}</Td>
            <Td>
              <ButtonGroup>
                <Button>Edit</Button>
                <Button
                  isLoading={loading}
                  onClick={() => handleDelete(report._id)}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </Td>
          </Tr>
        ))}
      </Tbody>
      <TableCaption>
        <FormattedMessage id="lastUpdateLabel" /> {new Date().toLocaleString()}
      </TableCaption>
    </Table>
  );
}
