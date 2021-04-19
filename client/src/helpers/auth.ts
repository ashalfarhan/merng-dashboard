const auth = {
  isLoggedIn: localStorage.getItem("isLoggedIn")
    ? // @ts-ignore
      JSON.parse(localStorage.getItem("isLoggedIn"))
    : null,
  login() {
    localStorage.setItem("isLoggedin", JSON.stringify(true));
  },
  logout() {
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
  },
};

export default auth;
