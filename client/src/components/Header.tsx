import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { Avatar } from "@chakra-ui/avatar";
import { Box, Heading, HStack } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { BiMenuAltRight } from "react-icons/bi";
import { ColorModeSwitcher } from "./ColorModeSwitcer";
import { Link, useHistory } from "react-router-dom";

export default function Header() {
  const history = useHistory();
  const handleLogout = () => {
    setTimeout(() => {
      history.push("/login");
    }, 300);
  };
  return (
    <Box p="4" display="flex" justifyContent="space-between">
      <Heading>
        <Link to="/">Dashboard</Link>
      </Heading>
      <HStack spacing="24px" alignItems="center">
        <ColorModeSwitcher />
        <Avatar size="md" />
        <Menu>
          <MenuButton as="button">
            <IconButton icon={<BiMenuAltRight />} aria-label="Menu Icon" />
          </MenuButton>
          <MenuList>
            <MenuItem>Account</MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Box>
  );
}
