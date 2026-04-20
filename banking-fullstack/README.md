# Banking Fullstack App

Spring Boot (Backend) + React (Frontend) ka pura integrated project.

---

## Project Structure

```
banking-fullstack/
├── backend/          ← Spring Boot (Java)
└── frontend/         ← React (JavaScript)
```

---

## Backend Setup (Spring Boot)

### Requirements
- Java 17+
- Maven
- MySQL

### Step 1 — MySQL Database banao
```sql
CREATE DATABASE banking_app;
```

### Step 2 — application.properties update karo
`backend/src/main/resources/application.properties` mein apna MySQL password daalo:
```
spring.datasource.password=YOUR_PASSWORD
```

### Step 3 — Backend run karo
```bash
cd backend
./mvnw spring-boot:run
```
Backend start hoga: `http://localhost:8080`

---

## Frontend Setup (React)

### Requirements
- Node.js 16+
- npm

### Step 1 — Dependencies install karo
```bash
cd frontend
npm install
```

### Step 2 — Frontend run karo
```bash
npm start
```
Frontend open hoga: `http://localhost:3000`

---

## API Endpoints

| Method | URL                          | Description         |
|--------|------------------------------|---------------------|
| POST   | /api/accounts                | Create account      |
| GET    | /api/accounts                | Get all accounts    |
| GET    | /api/accounts/{id}           | Get account by ID   |
| PUT    | /api/accounts/{id}/deposit   | Deposit amount      |
| PUT    | /api/accounts/{id}/withdraw  | Withdraw amount     |
| DELETE | /api/accounts/{id}           | Delete account      |
| POST   | /api/accounts/transfer       | Transfer funds      |
| GET    | /api/accounts/{id}/transactions | Get transactions |

---

## Run Order
1. Pehle MySQL start karo
2. Phir `backend` run karo
3. Phir `frontend` run karo
4. Browser mein `http://localhost:3000` kholo

