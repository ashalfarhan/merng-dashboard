import { IconButton, Image } from "@chakra-ui/react";
import IdLogo from "../../images/id-id.png";
import EnLogo from "../../images/en-uk.png";
import { useLocale } from "../../context/LocaleContext";

export default function LangSwitcher() {
  const { locale, switchLocale } = useLocale();
  const isEng = locale === "en-uk";
  const handleSwitchLang = () => {
    switchLocale(isEng ? "id-id" : "en-uk");
  };
  return (
    <IconButton
      aria-label="lang"
      onClick={() => handleSwitchLang()}
      icon={<Image width="6" src={isEng ? EnLogo : IdLogo} />}
    />
  );
}
