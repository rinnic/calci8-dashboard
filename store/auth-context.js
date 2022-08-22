import React, { useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  token: "",
  login: (token) => {},
  logout: () => {},
});

export const AuthProvider = (props) => {
  const [token, setToken] = useState("");

  const loginHandler = (token, expirationTime) => {
    console.log(token, expirationTime)
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    setToken(token);
  };

  const logoutHandler = () => {
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("token");
  };

  const ctxValue = {
    token,
    login: loginHandler,
    logout: logoutHandler,
    isLoggedIn: !!token
  };

  return <AuthContext.Provider value={ctxValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext

