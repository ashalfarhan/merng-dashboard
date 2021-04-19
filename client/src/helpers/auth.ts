import { useEffect, useState } from "react";

const useAuth = () => {
  // @ts-ignore
  const loggedIn = Boolean(JSON.parse(localStorage.getItem("isLoggedIn")));
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);

  useEffect(() => {
    setIsLoggedIn(loggedIn);
  }, [loggedIn]);

  const login = () => {
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
  };
  const logout = () => {
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
  };
  return {
    isLoggedIn,
    login,
    logout,
  };
};

export default useAuth;
