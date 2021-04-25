import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import EditReportForm from "../forms/EditReportForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditReportModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Report</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditReportForm onComplete={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
