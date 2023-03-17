import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// State:
import DataContext from "./context/DataContext";
// Auth:
import ProtectedRoute from "./components/ProtectedRoute";
// Own components:
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <div>
      <Router>
        {/* ...dodaj tu ewentualnie komponenty, które mają być wyświetlane na każdej stronie, np. Navbar */}
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route index element={<Dashboard />} />
          </Route>
          {/* ...dodaj tutaj inne ścieżki, jeśli są potrzebne */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
