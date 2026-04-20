import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AccountDetail from "./pages/AccountDetail";
import CreateAccount from "./pages/CreateAccount";
import BankingWarning from "./components/BankingWarning";
import "./App.css";

function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">₹</span>
        <span className="brand-name">BankApp</span>
      </div>
      <div className="navbar-links">
        <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>
          Dashboard
        </Link>
        <Link to="/create" className={location.pathname === "/create" ? "nav-link active" : "nav-link"}>
          + New Account
        </Link>
      </div>
    </nav>
  );
}

function App() {
  const [warningDismissed, setWarningDismissed] = useState(false);

  return (
    <Router>
      {!warningDismissed && (
        <BankingWarning onAccept={() => setWarningDismissed(true)} />
      )}
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/account/:id" element={<AccountDetail />} />
            <Route path="/create" element={<CreateAccount />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
