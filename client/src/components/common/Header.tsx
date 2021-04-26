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
import { BiMenuAltRight, BiLogOut } from "react-icons/bi";
import { RiAccountPinBoxLine, RiDashboardLine } from "react-icons/ri";
import { ColorModeSwitcher } from "../switchers/ColorModeSwitcer";
import { Link, useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "../../store";
import { getUser, isAuth, removeToken } from "../../store/slices/auth";
import { Tooltip } from "@chakra-ui/tooltip";
import { getLocale } from "../../store/slices/locale";
import { LOCALES } from "../../@types/enums";
import LangSwitcher from "../switchers/LangSwitcher";

export default function Header() {
  const history = useHistory();
  const { formatMessage } = useIntl();
  const isLoggedIn = useSelector(isAuth);
  const user = useSelector(getUser);
  const currentLocale = useSelector(getLocale);
  const isEng = currentLocale === LOCALES.EN;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(removeToken());
    history.push("/login");
  };
  const handleNav = (e: string) => {
    history.push(e);
  };

  return (
    <Box
      p="4"
      display="flex"
      justifyContent="space-between"
      borderBottom="2px"
      borderColor="teal"
      mb="4"
    >
      <Heading>
        <Link to="/">Dashboard</Link>
      </Heading>
      <HStack spacing="24px" alignItems="center">
        <ColorModeSwitcher />
        <LangSwitcher />
        {isLoggedIn && user && (
          <>
            <Tooltip
              label={`${isEng ? "Logged in as" : "Masuk sebagai"} ${
                user.email
              }`}
              fontSize="12px"
              aria-label="Logged in as"
            >
              <Avatar size="md" />
            </Tooltip>
            <Menu>
              <MenuButton as={IconButton} icon={<BiMenuAltRight />} />
              <MenuList>
                <MenuItem
                  onClick={() => handleNav("/me")}
                  icon={<RiAccountPinBoxLine />}
                >
                  {formatMessage({ id: "settings.account" })}
                </MenuItem>
                <MenuItem
                  onClick={() => handleNav("/dashboard")}
                  icon={<RiDashboardLine />}
                >
                  Dashboard
                </MenuItem>
                <MenuDivider />
                <MenuItem icon={<BiLogOut />} onClick={handleLogout}>
                  {formatMessage({ id: "settings.logout" })}
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
      </HStack>
    </Box>
  );
}
