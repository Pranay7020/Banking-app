import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllAccounts } from "../services/accountService";

export default function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllAccounts()
      .then((res) => setAccounts(res.data))
      .catch(() => setError("Failed to load data from backend. Is the server running?"))
      .finally(() => setLoading(false));
  }, []);

  const totalBalance = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);

  if (loading) return <div className="spinner" />;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">All accounts in one place</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Total Accounts</div>
          <div className="stat-value">{accounts.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Balance</div>
          <div className="stat-value">₹{totalBalance.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Balance</div>
          <div className="stat-value">
            ₹{accounts.length > 0
              ? (totalBalance / accounts.length).toLocaleString("en-IN", { maximumFractionDigits: 0 })
              : 0}
          </div>
        </div>
      </div>

      {accounts.length === 0 && !error ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏦</div>
          <div className="empty-state-title">No accounts yet</div>
          <p style={{ marginBottom: "1.5rem" }}>Create your first account</p>
          <Link to="/create" className="btn btn-primary">+ New Account</Link>
        </div>
      ) : (
        <div className="card-grid">
          {accounts.map((acc) => (
            <Link key={acc.id} to={`/account/${acc.id}`} className="account-card">
              <div className="account-card-header">
                <div className="account-name">{acc.accountHolderName || "Account Holder"}</div>
                <div className="account-id">#{acc.id}</div>
              </div>
              <div className="account-balance">
                ₹{(acc.balance || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </div>
              <div className="account-balance-label">Current Balance</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
