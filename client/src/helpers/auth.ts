const auth = {
  isLoggedIn: localStorage.getItem("isLoggedIn")
    ? // @ts-ignore
      Boolean(JSON.parse(localStorage.getItem("isLoggedIn")))
    : null,
  login() {
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
  },
  logout() {
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
  },
};

export default auth;
