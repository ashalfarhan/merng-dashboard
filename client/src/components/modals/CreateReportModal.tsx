import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import CreateReportForm from "../forms/CreateReportForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateReportModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Report</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateReportForm onComplete={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
