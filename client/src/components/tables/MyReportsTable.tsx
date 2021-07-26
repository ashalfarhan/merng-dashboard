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
import { useLocale } from "../../context/LocaleContext";
import {
  GetAllReportsDocument,
  MeDocument,
  MeQuery,
  useDeleteReportMutation,
} from "../../generated/graphql";
import { formatDate } from "../../helpers";
import { useAppDispatch } from "../../store";
import { setError } from "../../store/slices/error";

interface Props {
  data: MeQuery | undefined;
}

export default function MyReportsTable({ data }: Props) {
  const dispatch = useAppDispatch();
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
  const { locale, t } = useLocale();
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
          <Th w="xl">{t({ id: "report.nameLabel" })}</Th>
          <Th>{t({ id: "report.createdAtLabel" })}</Th>
          <Th w="xs">{t({ id: "report.actionLabel" })}</Th>
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
        {t({ id: "lastUpdateLabel" }) + +new Date().toLocaleString()}
      </TableCaption>
    </Table>
  );
}
