import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { CgDanger } from "react-icons/cg";
import { useAppDispatch, useAppSelector } from "../../store";
import { closeError, getError } from "../../store/slices/error";

export default function ErrorModal() {
  const dispatch = useAppDispatch();
  const { isError, message } = useAppSelector(getError);
  const handleShutError = () => {
    dispatch(closeError());
  };
  return (
    <Modal onClose={handleShutError} isOpen={isError} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="flex" alignItems="center">
          <Text mr="2" color="red.500" letterSpacing="wider">
            {"Oops"}
          </Text>
          <CgDanger color="red" />
        </ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter mt="4">
          <Button w="full" variant="outline" onClick={handleShutError}>
            {"Ok"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
