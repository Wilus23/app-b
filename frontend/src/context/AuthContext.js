import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    return token !== null;
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
        const token = data.token;
        localStorage.setItem("token", token);
        console.log("Before setting isLoggedIn:", isLoggedIn);
        setIsLoggedIn(true);
        console.log("After setting isLoggedIn:", isLoggedIn);
      } else {
        // Obsługa błędów, np. wyświetlenie komunikatu o błędzie
        // Na przykład:
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
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
