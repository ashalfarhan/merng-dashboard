import { Button } from "@chakra-ui/button";
import { Box, VStack } from "@chakra-ui/layout";
import { useHistory } from "react-router";

export default function SideBar() {
  const history = useHistory();
  const handleNav = (e: string) => {
    history.push(e);
  };
  return (
    <Box h="full">
      <VStack
        display="flex"
        flexDir="column"
        alignItems="stretch"
        spacing="24px"
        py="24px"
      >
        <Button onClick={() => handleNav("/dashboard")}>Overview</Button>
        <Button onClick={() => handleNav("/dashboard/reports")}>
          All Reports
        </Button>
        <Button onClick={() => handleNav("/dashboard/users")}>All Users</Button>
      </VStack>
    </Box>
  );
}
