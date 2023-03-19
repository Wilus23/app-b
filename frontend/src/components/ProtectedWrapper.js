import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedWrapper = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <>{children}</>;
  }

  return <Navigate to="/login" />;
};

export default ProtectedWrapper;
