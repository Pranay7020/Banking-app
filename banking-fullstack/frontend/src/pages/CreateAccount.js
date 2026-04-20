import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createAccount } from "../services/accountService";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ accountHolderName: "", balance: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setError("");
    if (!form.accountHolderName.trim()) {
      setError("Name is required.");
      return;
    }
    if (!form.balance || isNaN(form.balance) || Number(form.balance) < 0) {
      setError("Please enter a valid opening balance.");
      return;
    }
    setLoading(true);
    try {
      const res = await createAccount({
        accountHolderName: form.accountHolderName.trim(),
        balance: Number(form.balance),
      });
      navigate(`/account/${res.data.id}`);
    } catch {
      setError("Failed to create account. Please check the backend.");
    } finally { setLoading(false); }
  };

  return (
    <div>
      <Link to="/" className="btn btn-outline" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
        ← Back
      </Link>

      <div className="page-header">
        <h1 className="page-title">New Account</h1>
        <p className="page-subtitle">Open a new bank account</p>
      </div>

      <div className="card" style={{ maxWidth: 480 }}>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="form-group">
          <label className="form-label">Account Holder Name</label>
          <input
            type="text"
            name="accountHolderName"
            className="form-input"
            placeholder="Enter name..."
            value={form.accountHolderName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Opening Balance (₹)</label>
          <input
            type="number"
            name="balance"
            className="form-input"
            placeholder="0.00"
            value={form.balance}
            onChange={handleChange}
            min="0"
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading}
          style={{ width: "100%", justifyContent: "center" }}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </div>
    </div>
  );
}
