# Banking App - Frontend

React frontend for the Spring Boot Banking App.

## Setup

```bash
cd banking-frontend
npm install
npm start
```

App opens at: http://localhost:3000

## Backend Connection

Backend Spring Boot server `localhost:8080` pe hona chahiye.

### `.env` file banao:
```
REACT_APP_API_URL=http://localhost:8080/api
```

Production deploy ke liye `.env` mein apna deployed backend URL daalo.

## Features

- All accounts dashboard with total balance stats
- Account detail with deposit & withdraw
- New account creation
- Account deletion

## Expected Backend Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/accounts | Saare accounts |
| GET | /api/accounts/{id} | Ek account |
| POST | /api/accounts | Naya account banao |
| PUT | /api/accounts/{id}/deposit | Deposit |
| PUT | /api/accounts/{id}/withdraw | Withdraw |
| DELETE | /api/accounts/{id} | Delete |

## CORS

Spring Boot backend mein CORS enable karo:

```java
@CrossOrigin(origins = "http://localhost:3000")
```

Ya global config:

```java
@Bean
public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/api/**").allowedOrigins("http://localhost:3000");
        }
    };
}
```
