import React from "react";
import { Button } from "@mantine/core";
import { useAuth } from "../../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Button onClick={handleLogout} color="red">
      Wyloguj się
    </Button>
  );
};

export default LogoutButton;
