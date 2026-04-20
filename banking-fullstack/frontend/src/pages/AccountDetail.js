import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getAccount, deposit, withdraw, deleteAccount } from "../services/accountService";

export default function AccountDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [actionLoading, setActionLoading] = useState(false);

  const fetchAccount = () => {
    getAccount(id)
      .then((res) => setAccount(res.data))
      .catch(() => setMessage({ type: "danger", text: "Failed to load account." }))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAccount(); }, [id]);

  const handleDeposit = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setMessage({ type: "danger", text: "Please enter a valid amount." });
      return;
    }
    setActionLoading(true);
    try {
      const res = await deposit(id, Number(amount));
      setAccount(res.data);
      setMessage({ type: "success", text: `₹${amount} deposited successfully!` });
      setAmount("");
    } catch {
      setMessage({ type: "danger", text: "Deposit failed. Please try again." });
    } finally { setActionLoading(false); }
  };

  const handleWithdraw = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setMessage({ type: "danger", text: "Please enter a valid amount." });
      return;
    }
    setActionLoading(true);
    try {
      const res = await withdraw(id, Number(amount));
      setAccount(res.data);
      setMessage({ type: "success", text: `₹${amount} withdrawn successfully!` });
      setAmount("");
    } catch {
      setMessage({ type: "danger", text: "Insufficient balance or an error occurred." });
    } finally { setActionLoading(false); }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this account?")) return;
    try {
      await deleteAccount(id);
      navigate("/");
    } catch {
      setMessage({ type: "danger", text: "Failed to delete account." });
    }
  };

  if (loading) return <div className="spinner" />;
  if (!account) return <div className="alert alert-danger">Account not found.</div>;

  return (
    <div>
      <Link to="/" className="btn btn-outline" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
        ← Back
      </Link>

      <div className="detail-balance-card">
        <div className="detail-balance-label">Current Balance</div>
        <div className="detail-balance-amount">
          ₹{(account.balance || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
        </div>
        <div className="detail-balance-name">
          {account.accountHolderName} &nbsp;·&nbsp; Account #{account.id}
        </div>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      <div className="card">
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 20, marginBottom: "1.25rem" }}>
          Transaction
        </h2>

        <div className="form-group">
          <label className="form-label">Amount (₹)</label>
          <div className="amount-input-row">
            <input
              type="number"
              className="form-input"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
            />
          </div>
        </div>

        <div className="action-panel">
          <button
            className="btn btn-success"
            onClick={handleDeposit}
            disabled={actionLoading}
          >
            ↑ Deposit
          </button>
          <button
            className="btn btn-warning"
            onClick={handleWithdraw}
            disabled={actionLoading}
          >
            ↓ Withdraw
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={actionLoading}
            style={{ marginLeft: "auto" }}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
