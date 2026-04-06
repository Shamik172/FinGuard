# Finance Data Processing and Access Control Backend

## Overview

This project is a backend system designed for managing financial records with role-based access control. It provides APIs for handling users, financial data, and dashboard-level analytics.

The system focuses on clean architecture, proper data handling, and secure access control, simulating a real-world backend for a finance dashboard application.

---

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT (JSON Web Tokens)
* **Validation:** Zod
* **Architecture:** Modular (Controller → Service → Model)

---

## Project Structure

```
src/
├── modules/
│   ├── auth/
│   ├── user/
│   ├── record/
│   └── dashboard/
│
├── middleware/
├── config/
```

---

## Authentication & Authorization

* JWT-based authentication using Authorization headers
* Role-based access control (RBAC)

### Roles:

* **ADMIN**

  * Full access to users and records
* **ANALYST**

  * Can create, update, and view own records
* **VIEWER**

  * Read-only access

---

## Features Implemented

### User and Role Management

* User registration and login
* Role assignment
* Active/inactive user handling

### Financial Records CRUD

* Create, read, update, delete financial records
* Each record linked to a user

### Record Filtering

* Filter by:

  * Type (INCOME / EXPENSE)
  * Category
  * Date range

### Dashboard APIs

* Total income
* Total expenses
* Net balance
* Category-wise breakdown
* Monthly trends

### Role-Based Access Control

* Middleware-based role restriction
* Ownership-based access control

### Validation & Error Handling

* Request validation using Zod
* Centralized error handling
* Consistent API responses

### Data Persistence

* MongoDB with Mongoose schemas

---

## Key Design Decisions

* **Modular Architecture:** Separation of concerns using controllers, services, and models
* **RBAC + Ownership Logic:** Role-based restrictions combined with per-user data access
* **Aggregation Pipelines:** Used MongoDB aggregation for dashboard analytics
* **Stateless Authentication:** JWT used via Authorization headers for simplicity and scalability
* **Validation Layer:** Centralized validation middleware using Zod

---

## Trade-offs

* JWT logout is handled client-side instead of server-side token invalidation
* MongoDB chosen for flexibility over strict relational schema
* No caching layer implemented to keep scope focused

---

## Testing

API endpoints were tested using Thunder Client.

Test cases include:

* Valid and invalid inputs
* Role-based access restrictions
* Unauthorized access
* Edge cases such as missing fields and invalid data

---

## Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/Shamik172/FinGuard.git
cd FinGuard
cd backend
```

### 2. Install dependencies

```
npm install
```

### 3. Create `.env` file

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

### 4. Run the server

```
node --watch index.js
```

---

## API Documentation

The API endpoints are documented using a Postman collection for easy testing and exploration.

### Postman Collection

- Local file: `postman/FinGuard.postman_collection.json`

## Base URL

```
http://localhost:5000/api
```

---

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_token>
```

---

## API Endpoints Overview

### Auth

| Method | Endpoint       | Description             |
| ------ | -------------- | ----------------------- |
| POST   | /auth/register | Register a new user     |
| POST   | /auth/login    | Login and get JWT token |

---

### Users

| Method | Endpoint | Access | Description   |
| ------ | -------- | ------ | ------------- |
| GET    | /users   | ADMIN  | Get all users |

---

### Records

| Method | Endpoint     | Access         | Description     |
| ------ | ------------ | -------------- | --------------- |
| POST   | /records     | ADMIN, ANALYST | Create a record |
| GET    | /records     | All roles      | Get records     |
| PUT    | /records/:id | ADMIN, ANALYST | Update record   |
| DELETE | /records/:id | ADMIN          | Delete record   |

---

### Filtering

| Endpoint                                         | Description          |
| ------------------------------------------------ | -------------------- |
| /records?type=INCOME                             | Filter by type       |
| /records?category=Food                           | Filter by category   |
| /records?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD | Filter by date range |

---

### Dashboard

| Method | Endpoint              | Description              |
| ------ | --------------------- | ------------------------ |
| GET    | /dashboard/summary    | Income, expense, balance |
| GET    | /dashboard/categories | Category-wise totals     |
| GET    | /dashboard/trends     | Monthly trends           |

---

## How to Use

1. Import the Postman collection
2. Run the **Login API** to generate a token
3. The token will be automatically set in environment variables
4. Use other endpoints directly

---

## Notes

* Ensure MongoDB is running locally
* Update `.env` file before starting the server
* Use valid JWT token for protected routes


## Example API

POST /api/records

{
  "amount": 1500,
  "type": "INCOME",
  "category": "Salary",
  "date": "2026-04-05"
}

## Admin User Setup

An admin user can be created using the registration API by assigning the ADMIN role (if allowed), or by manually updating the user role in the database.

For testing purposes, an admin user was created using API requests.

Creates:

* Email: [admin@test.com](mailto:admin@test.com)
* Password: 123456

---

## Logout Behavior

Logout is handled on the client side by removing the JWT token. Since JWT is stateless, no server-side session invalidation is required.

---

## Future Improvements

* Pagination for large datasets
* Rate limiting
* API documentation with Swagger
* Unit and integration testing
* Caching using Redis

---

## Conclusion

This project demonstrates backend design principles such as modular architecture, secure authentication, role-based access control, and efficient data processing. The focus was on building a clean, maintainable, and scalable backend system.

---
