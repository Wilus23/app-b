import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Menu = () => {
  const { logout } = useAuth();

  return (
    <nav>
      <div className="logo">App-B</div>
      <ul>
        <li>
          <NavLink to="/dashboard">
            {/* Dodaj ikonę dla dashboard */}
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/history">
            {/* Dodaj ikonę dla historii */}
            History
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-income">
            {/* Dodaj ikonę dla dodawania dochodu */}
            Add Income
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-expense">
            {/* Dodaj ikonę dla dodawania wydatków */}
            Add Expense
          </NavLink>
        </li>
        <li>
          <button onClick={logout}>
            {/* Dodaj ikonę dla wylogowania */}
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
