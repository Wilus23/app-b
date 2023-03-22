import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// State:
import DataContext from "./context/DataContext";
// Auth:
import ProtectedWrapper from "./components/ProtectedWrapper";
// Own pages:
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddEarning from "./pages/AddTransaction/AddEarning";
import AddExpense from "./pages/AddTransaction/AddExpense";
import History from "./pages/History/History";
import Raports from "./pages/Raports/Raports";
import SpecialTransactions from "./pages/SpecialTransactions/SpecialTransactions";
import PriorityExpenses from "./pages/SpecialTransactions/PriorityExpenses";
// own components:
import Menu from "./components/menu/Menu";
import CategoryExpense from "./pages/SpecialTransactions/CategoryExpense";

function App() {
  return (
    <div>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedWrapper>
                <Dashboard />
              </ProtectedWrapper>
            }
          />
          <Route
            path="/addEarning"
            element={
              <ProtectedWrapper>
                <AddEarning />
              </ProtectedWrapper>
            }
          />
          <Route
            path="/addExpense"
            element={
              <ProtectedWrapper>
                <AddExpense />
              </ProtectedWrapper>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedWrapper>
                <History />
              </ProtectedWrapper>
            }
          />
          <Route
            path="/raports"
            element={
              <ProtectedWrapper>
                <Raports />
              </ProtectedWrapper>
            }
          />
          <Route
            path="/specialTransactions"
            element={
              <ProtectedWrapper>
                <SpecialTransactions />
              </ProtectedWrapper>
            }
          />
          <Route
            path="/specialTransactions/categoryExpense"
            element={
              <ProtectedWrapper>
                <CategoryExpense />
              </ProtectedWrapper>
            }
          />
          <Route
            path="/specialTransactions/priorityExpense"
            element={
              <ProtectedWrapper>
                <PriorityExpenses />
              </ProtectedWrapper>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
