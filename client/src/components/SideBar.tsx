import { Button } from "@chakra-ui/button";
import { Box, VStack } from "@chakra-ui/layout";
// import { useState } from "react";
import { useHistory } from "react-router";

export default function SideBar() {
  const adminRoutes = ["/admin", "/users"];
  // const [isAdmin, _] = useState(false);
  const isAdmin = false;
  const history = useHistory();
  const handleNav = (e: string) => {
    if (adminRoutes.includes(e) && isAdmin) {
      console.log(true);
      alert("You should be an admin!");
      history.push("/");
    }
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
        <Button onClick={() => handleNav("/overview")}>Overview</Button>
        <Button onClick={() => handleNav("/reports")}>All Reports</Button>
        <Button onClick={() => handleNav("/users")}>All Users</Button>
        {/* <Button onClick={() => setMenu(MENU.OVERVIEW)}>Overview</Button>
        <Button onClick={() => setMenu(MENU.USERS)}>User</Button> */}
      </VStack>
    </Box>
  );
}
