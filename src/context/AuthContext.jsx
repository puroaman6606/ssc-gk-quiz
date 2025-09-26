import { createContext, useState, useEffect } from "react";
import { getMe } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      getMe(token).then((data) => {
        if (data.error) {
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
        } else {
          setUser(data);
        }
      });
    }
  }, [token]);

  const loginUser = (token, userData) => {
    setToken(token);
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logoutUser = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
