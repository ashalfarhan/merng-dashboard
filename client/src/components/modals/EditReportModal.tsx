import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ReportType } from "../../generated/graphql";
import { EditReportForm } from "../forms";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: {
    type: ReportType;
    id: string;
    name: string;
  };
}

export default function EditReportModal({ data, isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Report</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditReportForm data={data} onComplete={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
