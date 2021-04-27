import { Image } from "@chakra-ui/image";
import IdLogo from "../../images/id-id.png";
import EnLogo from "../../images/en-uk.png";
import { IconButton } from "@chakra-ui/react";
import { LOCALES } from "../../@types/enums";
import { getLocale, switchLocale } from "../../store/slices/locale";
import { useDispatch, useSelector } from "../../store";

export default function LangSwitcher() {
  const dispatch = useDispatch();
  const currentLocale = useSelector(getLocale);
  const isEng = currentLocale === LOCALES.EN;
  const handleSwitchLang = () => {
    dispatch(switchLocale(isEng ? LOCALES.ID : LOCALES.EN));
  };
  return (
    <IconButton
      aria-label="lang"
      onClick={() => handleSwitchLang()}
      icon={<Image width="6" src={isEng ? EnLogo : IdLogo} />}
    />
  );
}
