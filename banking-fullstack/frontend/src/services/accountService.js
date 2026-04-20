import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Account APIs ───────────────────────────────────────────────
export const createAccount = (accountData) =>
  api.post("/accounts", accountData);

export const getAccount = (accountId) =>
  api.get(`/accounts/${accountId}`);

export const getAllAccounts = () =>
  api.get("/accounts");

export const deposit = (accountId, amount) =>
  api.put(`/accounts/${accountId}/deposit`, { amount });

export const withdraw = (accountId, amount) =>
  api.put(`/accounts/${accountId}/withdraw`, { amount });

export const deleteAccount = (accountId) =>
  api.delete(`/accounts/${accountId}`);

export default api;
