import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  Tooltip,
  MenuList,
  Avatar,
  Box,
  Heading,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { BiMenuAltRight, BiLogOut } from "react-icons/bi";
import { RiAccountPinBoxLine, RiDashboardLine } from "react-icons/ri";
import { LangSwitcher, ColorModeSwitcher } from "../switchers";
import { Link, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { getUser, isAuth, removeToken } from "../../store/slices/auth";
import { useLocale } from "../../context/LocaleContext";
import { memo } from "react";

const Header = () => {
  const history = useHistory();
  const isLoggedIn = useAppSelector(isAuth);
  const user = useAppSelector(getUser);
  const { locale, t } = useLocale();
  const isEng = locale === "en-uk";
  const dispatch = useAppDispatch();
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
                  {t({ id: "settings.account" })}
                </MenuItem>
                <MenuItem
                  onClick={() => handleNav("/dashboard")}
                  icon={<RiDashboardLine />}
                >
                  Dashboard
                </MenuItem>
                <MenuDivider />
                <MenuItem icon={<BiLogOut />} onClick={handleLogout}>
                  {t({ id: "settings.logout" })}
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
      </HStack>
    </Box>
  );
};

export default memo(Header);
