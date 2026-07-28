# 📝 Task Management System

A full-stack Task Management Application built as part of a technical assessment using **React, TypeScript, Node.js, Express, and MongoDB**.

The project consists of a **Node.js + Express REST API** backend and a **React + TypeScript** frontend. Users can register, log in, and manage their personal tasks through a responsive dashboard.




## 📸 Application Preview

<p align="center">
  <img src="https://github.com/user-attachments/assets/70c61440-a56d-4443-a975-46195df3c0f4" width="100%">
</p>

---

## 🚀 Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout

### Task Management

- Create Task
- View Tasks
- Update Task
- Delete Task
- Search Tasks
- Filter by Status
- Filter by Priority
- Sort Tasks
- Pagination

### Frontend

- React + TypeScript
- Responsive UI
- React Hook Form
- Zod Validation
- Axios
- React Router
- Toast Notifications
- Skeleton Loading
- Modern Dashboard UI

### Backend

- Express.js REST API
- MongoDB + Mongoose
- JWT Authentication
- Password Hashing (bcrypt)
- Input Validation
- Error Handling Middleware
- Pagination & Filtering
- ESLint

### DevOps

- GitHub Actions CI
- ESLint Checks
- Production Build Verification

---

## 🛠 Tech Stack

| Frontend | Backend |
|-----------|----------|
| React 19 | Node.js |
| TypeScript | Express.js |
| Vite | MongoDB |
| Tailwind CSS | Mongoose |
| React Hook Form | JWT |
| Zod | bcrypt |
| Axios | dotenv |
| React Router | ESLint |
| React Hot Toast | GitHub Actions |

---

# Project Structure

```
task-management-app
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── utils
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── providers
│   │   ├── routes
│   │   ├── services
│   │   ├── types
│   │   ├── utils
│   │   └── validation
│   │
│   ├── package.json
    ├── .env.example
│   └── .env
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/keyur155/koncpt-assessment.git

cd koncpt-assessment
```

---

# Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRE=7d
```

Run server

```bash
npm run dev
```

Backend runs on

```
http://localhost:3000
```

---

# Frontend Setup

Open another terminal

```bash
cd frontend

npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:3000/api/v1
```

Run frontend

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5000
```

---

# Available Scripts

## Backend

```bash
npm run dev
```

Starts development server.

```bash
npm start
```

Starts production server.

```bash
npm run lint
```

Runs ESLint.

---

## Frontend

```bash
npm run dev
```

Starts Vite development server.

```bash
npm run build
```

Creates production build.

```bash
npm run preview
```

Previews production build.

```bash
npm run lint
```

Runs ESLint.

---

# REST API

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/auth/register` | Register User |
| POST | `/api/v1/auth/login` | Login User |

---

## Tasks

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/v1/tasks` | Get All Tasks |
| POST | `/api/v1/tasks` | Create Task |
| PUT | `/api/v1/tasks/:id` | Update Task |
| DELETE | `/api/v1/tasks/:id` | Delete Task |

---

# Query Parameters

Pagination

```
?page=1&limit=10
```

Filter

```
?status=Pending

?priority=High
```

Sorting

```
?sort=-createdAt

?sort=dueDate
```

Search

```
?search=meeting
```

---

# Authentication

Protected endpoints require a JWT access token.

Example:

```
Authorization: Bearer <access_token>
```


# CI/CD

GitHub Actions automatically performs:

- Install dependencies
- ESLint checks
- TypeScript compilation
- Production build verification

---


# Author

**Keyur Sathwara**

GitHub: https://github.com/keyur155
