import { LOCALES } from "../@types/enums";

export const formatDate = (iso: any, locale: LOCALES | string) => {
  const date = new Date(iso);
  const days: { [key: string]: string[] } = {
    [LOCALES.EN]: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    [LOCALES.ID]: [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ],
  };
  return (
    days[locale][date.getDay()] +
    " " +
    date.getDate() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getFullYear()
  );
};
