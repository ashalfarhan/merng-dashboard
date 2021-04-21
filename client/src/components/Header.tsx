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
import { FormattedMessage } from "react-intl";
import { LOCALES } from "../@types/enums";
import { useDispatch, useSelector } from "../store";
import { isAuth, removeToken } from "../store/slices/auth";
import { getLocale, switchLocale } from "../store/slices/locale";

export default function Header() {
  const history = useHistory();
  const isLoggedIn = useSelector(isAuth);
  const currentLocale = useSelector(getLocale);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(removeToken());
    history.push("/login");
  };
  const isEng = currentLocale === LOCALES.EN;
  const handleSwitchLang = () => {
    dispatch(switchLocale(isEng ? LOCALES.ID : LOCALES.EN));
  };
  return (
    <Box p="4" display="flex" justifyContent="space-between">
      <Heading>
        <Link to="/">Dashboard</Link>
      </Heading>
      <HStack spacing="24px" alignItems="center">
        <ColorModeSwitcher />
        {isLoggedIn && (
          <>
            <Avatar size="md" />
            <Menu>
              <MenuButton as="button">
                <IconButton icon={<BiMenuAltRight />} aria-label="Menu Icon" />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <FormattedMessage id="settings.account" />
                </MenuItem>
                <MenuItem onClick={() => handleSwitchLang()}>
                  {isEng ? "Bahasa Indonesia" : "English"}
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogout}>
                  <FormattedMessage id="settings.logout" />
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
      </HStack>
    </Box>
  );
}
