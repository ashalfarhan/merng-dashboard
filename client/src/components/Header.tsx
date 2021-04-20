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
import useAuth from "../helpers/auth";
import { FormattedMessage } from "react-intl";
import { useContext } from "react";
import { AppLocale } from "../libs/i18n";
import { LOCALES } from "../@types/enums";
export default function Header() {
  const history = useHistory();
  const { locale, dispatch } = useContext(AppLocale);
  const { logout, isLoggedIn } = useAuth();
  const handleLogout = () => {
    logout();
    history.push("/login");
  };
  const isEng = locale === LOCALES.EN;
  const handleSwitchLang = () => {
    dispatch!({
      type: "SET",
      payload: isEng ? LOCALES.ID : LOCALES.EN,
    });
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
                  {locale === LOCALES.EN ? "Bahasa Indonesia" : "English"}
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
