import { Flex, Heading, Button, useDisclosure } from "@chakra-ui/react";
import { BsPlusSquareFill } from "react-icons/bs";
import { useIntl } from "react-intl";
import { AddStuffModal } from "../modals";

export default function DetailStuffHeading({ reportId }: { reportId: string }) {
  const { formatMessage } = useIntl();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
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
        <AddStuffModal
          isOpen={isOpen}
          onClose={onClose}
          data={{
            id: reportId,
          }}
        />
        <BsPlusSquareFill style={{ marginRight: "4px" }} />
        {formatMessage({ id: "menu.addStuffLabel" })}
      </Button>
    </Flex>
  );
}
