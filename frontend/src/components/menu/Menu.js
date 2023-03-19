import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  AiFillDashboard,
  AiFillDollarCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BiHistory } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import LogoutButton from "../ui/LogoutButton";

import menu__dashborad from "../../assets/svg/menu/menu__dashboard.svg";
import menu__history from "../../assets/svg/menu/menu__history.svg";
import menu__raports from "../../assets/svg/menu/menu__raports.svg";
import menu__arrowDown from "../../assets/svg/menu/menu__arrowDown.svg";
import menu__arrowUp from "../../assets/svg/menu/menu__arrowUp.svg";
import menu__special from "../../assets/svg/menu/menu__special.svg";

export const DashboardIcon = () => <AiFillDashboard />;
export const HistoryIcon = () => <BiHistory />;
export const AddIncomeIcon = () => <AiFillDollarCircle />;
export const AddExpenseIcon = () => <AiFillMinusCircle />;
export const LogoutIcon = () => <IoLogOutOutline />;

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  borderBottom: "1px solid #ccc",
  backgroundColor: "white",
};

const ulStyle = {
  listStyleType: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: 0,
  padding: 0,
};

const liStyle = {
  padding: "0 1rem",
};

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};
const logo = {
  color: "#1F7DFF",
  fontSize: 20,
  marginLeft: "5%",
};

const Menu = () => {
  const { logout } = useAuth();

  return (
    <nav style={navStyle}>
      <div style={logo}>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          App-B
        </Link>
      </div>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <NavLink to="/dashboard" style={linkStyle}>
            <img src={menu__dashborad} alt="icon" />
            Dashboard
          </NavLink>
        </li>
        <li style={liStyle}>
          <NavLink to="/history" style={linkStyle}>
            <img src={menu__history} alt="icon" />
            Historia
          </NavLink>
        </li>
        <li style={liStyle}>
          <NavLink to="/specialTransactions" style={linkStyle}>
            <img src={menu__special} alt="icon" />
            Specjalne
          </NavLink>
        </li>
        <li style={liStyle}>
          <NavLink to="/raports" style={linkStyle}>
            <img src={menu__raports} alt="icon" />
            Raporty
          </NavLink>
        </li>
        <li style={liStyle}>
          <NavLink to="/addEarning" style={linkStyle}>
            <img src={menu__arrowUp} alt="icon" />
            Dodaj zarobek
          </NavLink>
        </li>
        <li style={liStyle}>
          <NavLink to="/addExpense" style={linkStyle}>
            <img src={menu__arrowDown} alt="icon" />
            Dodaj wydatek
          </NavLink>
        </li>

        <li style={liStyle}>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
