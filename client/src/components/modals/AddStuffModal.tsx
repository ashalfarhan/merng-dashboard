import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import AddStuffForm from "../forms/AddStuffForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: {
    id: string;
  };
}

export default function AddStuffModal({ data, isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Stuff</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AddStuffForm data={data} onComplete={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
