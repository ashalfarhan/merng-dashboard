import { Flex, Heading, Button, useDisclosure } from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import { useIntl } from "react-intl";
import { ReportType } from "../../generated/graphql";
import { EditReportModal } from "../modals";

interface Props {
  reporterName: string;
  reportId: string;
  reportType: ReportType;
  reportName: string;
}

export default function EditReporSection({
  reportId,
  reportName,
  reportType,
  reporterName,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { formatMessage } = useIntl();
  return (
    <Flex
      pb="4"
      borderBottom="1px"
      borderColor="yellow"
      justify="space-between"
      align="center"
    >
      <Heading fontSize="32">
        {formatMessage({ id: "report.reporterLabel" }) + ": " + reporterName}
      </Heading>
      <Button onClick={onOpen} variant="solid" colorScheme="yellow">
        <EditReportModal
          isOpen={isOpen}
          onClose={onClose}
          data={{
            id: reportId,
            type: reportType,
            name: reportName,
          }}
        />
        <AiOutlineEdit style={{ marginRight: "4px" }} />
        {formatMessage({ id: "menu.editReportLabel" })}
      </Button>
    </Flex>
  );
}
