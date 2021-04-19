export const getAccessToken = () => {
  return String(localStorage.getItem("fmas"));
};
export const setAccessToken = (s: string) => {
  return localStorage.setItem("fmas", String(s));
};
