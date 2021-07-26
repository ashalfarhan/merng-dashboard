import { LOCALE } from "../@types";

export const formatDate = (iso: any, locale: LOCALE | string) => {
  const date = new Date(iso);
  const days: Record<string, string[]> = {
    "en-uk": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    "id-id": ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
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
