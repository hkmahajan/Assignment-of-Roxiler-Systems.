# Store Rating App

A full-stack web application for rating stores, built with **React + Vite** (frontend) and **Node.js + Express + Prisma** (backend).

## Features

| Role | Capabilities |
|---|---|
| **Admin** | Manage users & stores, view dashboard stats |
| **User** | Browse & search stores, submit and edit ratings |
| **Store Owner** | View own store dashboard, see who rated and average score |

## Tech Stack

- **Frontend**: React 18, Vite, React Router v6, Axios, react-hot-toast
- **Backend**: Node.js, Express.js, Prisma ORM, MySQL
- **Auth**: JWT (jsonwebtoken), bcryptjs

## Project Structure

```
├── backend/
│   ├── prisma/schema.prisma        # DB schema
│   ├── src/
│   │   ├── config/db.js            # Prisma client
│   │   ├── controllers/            # Route handlers
│   │   ├── middleware/             # Auth, role, error
│   │   ├── models/                 # Prisma query helpers
│   │   ├── routes/                 # Express routes
│   │   ├── services/               # Business logic
│   │   ├── utils/                  # JWT + validators
│   │   ├── app.js                  # Express app
│   │   └── server.js               # Entry point
│   └── .env
│
└── frontend/
    └── src/
        ├── api/axios.js            # Axios instance + interceptors
        ├── components/             # Reusable UI components
        ├── context/AuthContext.jsx # Auth state management
        ├── hooks/useAuth.js        # Auth hook
        ├── pages/                  # All application pages
        └── routes/AppRoutes.jsx    # Role-based routing
```

## Pages

### Authentication
- `/login` — Sign in
- `/register` — Create account
- `/change-password` — Update password (protected)

### Admin
- `/admin/dashboard` — Stats overview
- `/admin/users` — List & search users
- `/admin/users/add` — Add new user
- `/admin/stores` — List & search stores
- `/admin/stores/add` — Add new store

### User
- `/stores` — Browse & search stores, rate them
- `/stores/:id/rate` — Rate a specific store
- `/stores/:id/edit-rating` — Edit existing rating

### Store Owner
- `/owner/dashboard` — Store info & average rating
- `/owner/ratings` — Full list of who rated

## Setup

### Using Docker Compose (Recommended)

You can run the entire application (Database, Backend, and Frontend) using Docker:

```bash
docker-compose up --build -d
```

This will automatically start:
- **MySQL database** on port 3306
- **Backend server** on port 5000
- **Frontend** on port 5173 (http://localhost:5173)

### Manual Setup

#### Prerequisites
- Node.js 18+
- MySQL database

#### Backend
```bash
cd backend
npm install
# Configure .env with your DATABASE_URL and JWT_SECRET
npx prisma migrate dev --name init
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register user |
| POST | `/api/auth/login` | Public | Login |
| POST | `/api/auth/change-password` | Any | Change password |
| GET | `/api/users` | Admin | List users |
| POST | `/api/users` | Admin | Add user |
| GET | `/api/stores` | Any | List stores |
| POST | `/api/stores` | Admin | Add store |
| GET | `/api/stores/my-store` | Owner | Owner dashboard |
| POST | `/api/ratings` | User | Submit rating |
| PUT | `/api/ratings/:storeId` | User | Edit rating |
| GET | `/api/ratings/store/:id` | Owner | View store ratings |
