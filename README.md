# Task Manager — Full Stack Application

A full-stack **Task Management System** built with modern web technologies.

Users can register, login, and manage their tasks with features like task creation, status toggle, search, filtering, and pagination.

---

## 🚀 Tech Stack

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Axios

### Backend

* NestJS
* Prisma ORM
* JWT Authentication
* Bcrypt Password Hashing

### Database

* Neon PostgreSQL

---

## 📂 Project Structure

```
task-manager
│
├── backend        # NestJS API
├── frontend       # Next.js client
└── README.md
```

---

## ✨ Features

* User Authentication (Register / Login)
* JWT Token Authentication
* Create Tasks
* Update Tasks
* Delete Tasks
* Toggle Task Status
* Search Tasks
* Filter Tasks (Completed / Pending)
* Pagination
* Protected Dashboard

---

## ⚙️ Setup Instructions

Clone repository:

```
git clone <your-repo-url>
cd task-manager
```

### Run Backend

```
cd backend
npm install
npm run start:dev
```

### Run Frontend

```
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Backend `.env`

```
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_secret_key
```

---

## 📡 API Endpoints

### Auth

```
POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/logout
GET  /auth/profile
```

### Tasks

```
GET    /tasks
POST   /tasks
GET    /tasks/:id
PATCH  /tasks/:id
DELETE /tasks/:id
PATCH  /tasks/:id/toggle
```

---

## 📸 Demo

Users can:

* Register
* Login
* Create tasks
* Mark tasks as completed
* Search and filter tasks
* Delete tasks
* Logout

---

## 📜 License

This project was created for a **Full-Stack Development Assignment**.
