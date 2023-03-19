import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("token") !== null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const login = async (email, password) => {
    console.log(
      "Login function called with email:",
      email,
      "and password:",
      password
    );
    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const receivedToken = data.token;
        console.log("Received token:", receivedToken);
        localStorage.setItem("token", receivedToken);
        setIsLoggedIn(true);
        setToken(receivedToken);
      } else {
        alert(
          data.message || "Wystąpił błąd podczas logowania. Spróbuj ponownie."
        );
      }
    } catch (error) {
      console.error(error);
      alert("Wystąpił błąd podczas logowania. Spróbuj ponownie.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
