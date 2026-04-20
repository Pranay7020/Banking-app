import React, { useState } from "react";

export default function BankingWarning({ onAccept }) {
  const [accepted, setAccepted] = useState(false);
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  const handleAccept = () => {
    setAccepted(true);
    setTimeout(() => {
      setClosed(true);
      if (onAccept) onAccept();
    }, 600);
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: "1rem",
    }}>
      <div style={{
        background: "#ffffff",
        border: "1px solid #e2ddd6",
        borderRadius: "12px",
        padding: "2rem",
        maxWidth: "520px",
        width: "100%",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
          <div style={{
            width: "44px", height: "44px", borderRadius: "50%",
            background: "#FAEEDA", display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="#BA7517" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <p style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "600", color: "#854F0B" }}>
              Security Warning
            </p>
            <p style={{ margin: 0, fontSize: "14px", color: "#6b6560", lineHeight: "1.6" }}>
              This is a secure banking portal. Please do not share your personal information with anyone.
            </p>
          </div>
        </div>

        {/* Warning Points */}
        <div style={{
          marginTop: "1.25rem",
          borderTop: "1px solid #e2ddd6",
          paddingTop: "1rem",
          display: "flex", flexDirection: "column", gap: "10px",
        }}>
          {[
            "Never share your password or OTP with anyone.",
            "The bank will never ask for your ATM details over the phone.",
            "In case of suspicious activity, contact our helpline immediately.",
          ].map((msg, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#6b6560" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="#E24B4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {msg}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "10px" }}>
          <button
            onClick={handleAccept}
            style={{
              flex: 1, padding: "10px 0",
              borderRadius: "8px",
              border: accepted ? "1px solid #639922" : "1px solid #c0bdb5",
              background: accepted ? "#EAF3DE" : "#ffffff",
              fontSize: "14px", fontWeight: "500",
              cursor: "pointer",
              color: accepted ? "#3B6D11" : "#1a1816",
              transition: "all 0.2s",
              fontFamily: "inherit",
            }}
          >
            {accepted ? "Accepted ✓" : "I Understand"}
          </button>
          <button
            onClick={() => setClosed(true)}
            style={{
              flex: 1, padding: "10px 0",
              borderRadius: "8px",
              border: "1px solid #F0997B",
              background: "#FAECE7",
              fontSize: "14px", fontWeight: "500",
              cursor: "pointer",
              color: "#993C1D",
              transition: "all 0.2s",
              fontFamily: "inherit",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
