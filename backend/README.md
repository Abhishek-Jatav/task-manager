# Task Manager Backend

Backend API for the Task Manager application built with **NestJS**.

---

## 🚀 Tech Stack

* NestJS
* Prisma ORM
* PostgreSQL (Neon)
* JWT Authentication
* Bcrypt

---

## ⚙️ Setup

Install dependencies:

```
npm install
```

Create `.env`

```
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_secret
```

Run database migrations:

```
npx prisma migrate dev
```

Start server:

```
npm run start:dev
```

Server runs on:

```
http://localhost:3000
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

## 🔐 Authentication

Authentication uses **JWT tokens**.

Send token in header:

```
Authorization: Bearer <token>
```

---

## 🗄 Database Schema

### User

```
id
email
password
createdAt
```

### Task

```
id
title
status
userId
createdAt
```

---

## 🧪 API Testing

You can test endpoints using:

* Thunder Client
* Postman
* cURL
