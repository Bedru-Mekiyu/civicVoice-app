<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/CivicVoice-Et-16a34a?style=for-the-badge&labelColor=1a1a2e&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBmaWxsPSIjMTZhMzRhIiBkPSJNMjAgM0wxIDM3aDM4eiIvPjwvc3ZnPg==">
    <img alt="CivicVoice Et" src="https://img.shields.io/badge/CivicVoice-Et-009639?style=for-the-badge&labelColor=FEDD00" width="320">
  </picture>
</p>

<p align="center">
  <b>Ethiopian Civic Engagement Platform</b><br>
  <i>Transform citizen feedback into actionable government insights</i>
</p>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#features">Features</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#api-reference">API</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#contributing">Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?logo=react" alt="React 18.3">
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript" alt="TypeScript 5.8">
  <img src="https://img.shields.io/badge/Node.js-18-339933?logo=node.js" alt="Node.js 18">
  <img src="https://img.shields.io/badge/Express-4.18-000000?logo=express" alt="Express 4.18">
  <img src="https://img.shields.io/badge/MongoDB-7.6-47A248?logo=mongodb" alt="MongoDB 7.6">
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite" alt="Vite 5.4">
  <img src="https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss" alt="Tailwind 3.4">
  <img src="https://img.shields.io/badge/i18n-7_Languages-0ea5e9" alt="7 Languages">
  <br>
  <img src="https://img.shields.io/badge/PWA-Ready-5A0FC8" alt="PWA Ready">
  <img src="https://img.shields.io/badge/Status-Alpha-orange" alt="Alpha">
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT License">
  <img src="https://img.shields.io/badge/Deployed-Render-46E3B7?logo=render" alt="Deployed on Render">
</p>

---

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Why CivicVoice Et?](#why-civicvoice-et)
- [Features](#features)
- [User Roles](#user-roles)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Database Design](#database-design)
- [API Reference](#api-reference)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security](#security)
- [Internationalization](#internationalization)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [FAQ](#faq)
- [License](#license)
- [Team](#team)

---

## Overview

**CivicVoice Et** is a full-stack civic engagement platform that bridges the gap between Ethiopian citizens and government administrators. Citizens can submit feedback on public services across multiple sectors, while administrators gain data-driven insights through an analytics dashboard.

> **Current Status**: Alpha — actively developed by a team at Addis Ababa University. Deployed on Render free tier.

### Problem Statement

Citizens lack accessible, structured channels to provide feedback on government services. Administrators lack centralized tools to aggregate, analyze, and act on citizen feedback. This disconnect hinders data-driven decision-making and transparent governance in Ethiopia.

### Why CivicVoice Et?

| Motivation | Detail |
|------------|--------|
| **Structured Feedback** | Rate services (1–5), leave comments, attach supporting files |
| **Multilingual** | 7 Ethiopian languages (Amharic, Oromo, Tigrinya, Somali, Afar, Gurage, English) |
| **Accessible** | WCAG-compliant design with keyboard navigation and screen reader support |
| **Actionable Analytics** | Real-time dashboards with charts, filters, and CSV export |
| **Ethiopian-First Design** | Built around Ethiopian government sectors, regions (13 regions), and cultural context |
| **Offline-Ready** | PWA with service worker caching + mock mode for demo environments |
| **Anonymous Option** | Submit feedback without revealing identity |

---

## Features

### For Citizens

| Feature | Description | Status |
|---------|-------------|--------|
| **Service Feedback** | Rate public services (1–5 stars), comment, and attach files | ✅ Implemented |
| **Multi-Sector Coverage** | Healthcare, Education, Transportation, Public Safety, and 6 more sectors | ✅ Implemented |
| **Email Verification** | OTP-based email verification via Resend.com / Mailtrap | ✅ Implemented |
| **Anonymous Option** | Submit feedback without revealing identity | ✅ Implemented |
| **Citizen Dashboard** | View personal feedback history and submission status | ✅ Implemented |
| **Dark Mode** | Toggle between light and dark themes (next-themes) | ✅ Implemented |
| **Multi-Language** | 7 Ethiopian languages + English (i18n context provider) | ✅ Implemented |
| **File Attachments** | Upload images, PDFs, documents with feedback (Multer) | ✅ Implemented |
| **PWA Support** | Installable as progressive web app (service worker + manifest) | ✅ Implemented |

### For Administrators

| Feature | Description | Status |
|---------|-------------|--------|
| **Admin Dashboard** | Aggregate KPIs: total feedback, average ratings, weekly trends | ✅ Implemented |
| **Citizen Management** | View user profiles, verification status, submission counts | ✅ Implemented |
| **Feedback Table** | Paginated, filterable feedback list with search | ✅ Implemented |
| **Data Visualization** | Charts (Recharts) showing feedback trends and sector breakdowns | ✅ Implemented |
| **CSV Export** | Download feedback data as CSV for external analysis | ✅ Implemented |
| **Service Management** | Add and manage government service categories | ✅ Implemented |
| **Role-Based Access** | Admin-only routes for sensitive operations | ✅ Implemented |

### Platform Features

| Feature | Description | Status |
|---------|-------------|--------|
| **JWT Authentication** | Secure token-based auth with 24h expiry | ✅ Implemented |
| **Responsive Design** | Mobile-first, works on all screen sizes | ✅ Implemented |
| **SEO Optimized** | Open Graph, Twitter Cards, JSON-LD structured data | ✅ Implemented |
| **Analytics Tracking** | Client-side event tracking for usage metrics | ✅ Implemented |
| **Health Check** | API health endpoint with MongoDB connection status | ✅ Implemented |
| **Mock Mode** | Works offline with mock data for demo presentations | ✅ Implemented |
| **Password Strength Meter** | Visual password strength indicator | ✅ Implemented |
| **Image Compression** | Client-side image compression for uploads | ✅ Implemented |
| **404 Page** | Custom not-found page | ✅ Implemented |

---

## User Roles

### Citizen

- Register with email + OTP verification
- Submit feedback on 10+ government service sectors
- View personal feedback history (citizen dashboard `/citizen-dashboard`)
- Upload profile avatar with camera hover UI
- Manage profile and settings
- Switch language (7 languages) and theme (light/dark)
- Submit feedback anonymously
- Upload file attachments with feedback

### Administrator

- All Citizen capabilities
- Access admin dashboard (`/dashboard`) with aggregate analytics
- View and manage citizen feedback with pagination
- Add/manage service categories
- Export data as CSV
- View citizen profiles and engagement metrics
- Weekly/monthly/yearly chart views
- Settings panel with session info

> **Note**: Admin accounts are created via the `seed:admin` script using environment variables. There is no admin self-registration.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT (Frontend)                           │
│                                                                     │
│  React 18 + TypeScript + Vite 5.4                                   │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Pages (32)              │  Components (16 + 49 shadcn/ui)    │  │
│  │  ──────────              │  ───────────────────────────        │  │
│  │  Landing, EnhancedLogin, │  Navigation, ProtectedRoute,       │  │
│  │  EnhancedSignup,         │  SEOHead, ThemeToggle,              │  │
│  │  AdminDashboard,         │  LanguageSelector, PWAInstallPrompt │  │
│  │  CitizenDashboard,       │  EmptyState, ErrorBoundary,         │  │
│  │  Feedback, Services,     │  LoadingSpinner, LoadingSkeleton,   │  │
│  │  About, Contact, FAQ,    │  Breadcrumb, NewsletterSignup,      │  │
│  │  GovernmentServices,     │  NotificationToast,                 │  │
│  │  PublicReports,          │  PasswordStrengthMeter,             │  │
│  │  IssueTracking, ...      │  EthiopianFlagBadge                 │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  State & Data Layer                                        │  │
│  │  ──────────────────                                        │  │
│  │  LanguageContext (i18n — 7 languages)                       │  │
│  │  TanStack React Query 5.83 (caching, retry, staleTime)     │  │
│  │  React Router DOM 6.30 (32 routes)                          │  │
│  │  API Client (api.ts — fetch wrapper, mock fallback)         │  │
│  │  Zod Validation (feedback.schema.ts — 5 schemas)            │  │
│  │  Auth (auth.ts — localStorage JWT management)               │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Utilities & Hooks                                          │  │
│  │  ──────────────────                                          │  │
│  │  analytics.ts (event tracking, page views, errors)           │  │
│  │  performance.ts (debounce, throttle, image compress)         │  │
│  │  emailService.ts (OTP email/SMS helper)                      │  │
│  │  validation.ts (Zod schemas, sanitize, rate limiter)         │  │
│  │  Hooks: useApi, useDebounce, useFormValidation,              │  │
│  │         useIntersectionObserver, useLocalStorage,            │  │
│  │         useOptimisticUpdate, use-toast, use-mobile           │  │
│  │  shadcn/ui: 49 components (accordion → tooltip)             │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                       │
└──────────────────────────────┼──────────────────────────────────────┘
                               │ HTTP (JSON) — REST API
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      SERVER (Backend)                               │
│                                                                     │
│  Node.js 18 + Express.js 4.18                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Middleware Stack           │  Routes                         │  │
│  │  ──────────────────        │  ──────                         │  │
│  │  CORS (whitelist origins)  │  /api/auth     (6 endpoints)     │  │
│  │  JSON Parser (15mb limit)  │  /api/feedback  (2 endpoints)    │  │
│  │  URL-encoded (15mb limit)  │  /api/services  (2 endpoints)    │  │
│  │  Static /uploads serve     │  /api/dashboard  (1 endpoint)    │  │
│  │  JWT Protection (inline)   │  /api/analytics  (1 endpoint)    │  │
│  │  Admin Guard (inline)      │  /health         (1 endpoint)    │  │
│  │  Multer (file uploads)     │                                   │  │
│  │  Global 404 + Error Handler│                                   │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Controllers              │  Models (Mongoose)               │  │
│  │  ────────────             │  ──────────────────               │  │
│  │  authController           │  User — auth, roles, otp          │  │
│  │    - register, verifyOTP  │  Feedback — ratings, comments     │  │
│  │    - signIn, getMe        │  Service — service categories     │  │
│  │    - protect, requireAdmin│  Analytics — user metrics         │  │
│  │    - updateAvatar, logout │  Institution.js — ⚠️ empty file   │  │
│  │                           │  sectors.js — ⚠️ empty file       │  │
│  │  feedbackController       └────────────────────────────────┘  │
│  │    - submit, list (no     │                                   │
│  │      pagination in v1)    │                                   │
│  │                           │                                   │
│  │  dashboardController      │                                   │
│  │    - aggregate metrics    │                                   │
│  │    - weekly trends        │                                   │
│  │    - citizen stats        │                                   │
│  │    - recent feedback      │                                   │
│  │                           │                                   │
│  │  analyticsController      │                                   │
│  │    - per-user analytics   │                                   │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Email System                                               │  │
│  │  ─────────────                                              │  │
│  │  authController.js: Mailtrap SMTP (nodemailer)              │  │
│  │    - 6-digit OTP, 10-min expiry                             │  │
│  │    - HTML email template with green theme                   │  │
│  │  utils/sendEmail.js: Resend.com SDK (alternative)           │  │
│  │    - onboarding@resend.dev verified sender                   │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                       │
└──────────────────────────────┼──────────────────────────────────────┘
                               │
                               ▼
              ┌─────────────────────────────────┐
              │         MongoDB Atlas             │
              │  ┌─────────────────────────────┐ │
              │  │ civicvoice database          │ │
              │  │  ├ users                     │ │
              │  │  ├ feedback                  │ │
              │  │  ├ services                  │ │
              │  │  ├ analytics                 │ │
              │  │  Connection:                  │ │
              │  │  ├ maxPoolSize: 10            │ │
              │  │  ├ serverSelectionTimeout: 8s │ │
              │  │  ├ socketTimeoutMS: 45000    │ │
              │  │  └ strictQuery: false         │ │
              │  └─────────────────────────────┘ │
              └─────────────────────────────────┘
```

> **Note**: Three middleware files (`authMiddleware.js`, `roleMiddleware.js`, `errorMiddleware.js`) exist but are empty. Auth and role logic is implemented inline in `authController.js`. Two model files (`Institution.js`, `sectors.js`) also exist but are empty — these are placeholders for future features.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend Framework** | React | 18.3.1 |
| **Language** | TypeScript | 5.8 |
| **Build Tool** | Vite | 5.4 |
| **Styling** | Tailwind CSS + shadcn/ui | 3.4 |
| **Routing** | React Router DOM | 6.30 |
| **Data Fetching** | TanStack React Query | 5.83 |
| **Charts** | Recharts | 2.15 |
| **Forms** | React Hook Form + Zod | 7.61 / 4.11 |
| **Backend Runtime** | Node.js | 18+ |
| **Backend Framework** | Express | 4.18 |
| **Database** | MongoDB + Mongoose | 7.6 |
| **Authentication** | JWT (jsonwebtoken) | 9.0 |
| **Password Hashing** | bcryptjs (salt rounds: 8) | 2.4 |
| **File Uploads** | Multer | 1.4 |
| **Email (Primary)** | Nodemailer + Mailtrap SMTP | 7.0 |
| **Email (Alternative)** | Resend.com SDK | — |
| **Icons** | Lucide React | 0.462 |
| **PWA** | Service Worker + Web Manifest | Custom |
| **Theme** | next-themes | 0.4 |
| **SEO** | react-helmet-async | 2.0 |
| **Notifications** | sonner + custom toast | 1.7 |

### Frontend Dependencies (49 shadcn/ui components)

```text
@radix-ui/*:   28 packages (accordion → tooltip)
@tanstack/react-query: 5.83.0
react-hook-form: 7.61.1  |  @hookform/resolvers: 3.10.0
zod: 4.11
recharts: 2.15.4
lucide-react: 0.462.0
date-fns: 3.6.0
next-themes: 0.4.6
react-helmet-async: 2.0.5
sonner: 1.7.4
```

### Backend Dependencies

```text
express: 4.18.2       |  mongoose: 7.6.3
jsonwebtoken: 9.0.2   |  bcryptjs: 2.4.3
cors: 2.8.5           |  multer: 1.4.5-lts.1
nodemailer: 7.0.10    |  dotenv: 16.4.5
axios: 1.13.2         |  resend (in utils/sendEmail.js)
```

---

## Database Design

### Entity Relationship Diagram

```mermaid
erDiagram
    User ||--o{ Feedback : submits
    User ||--o{ Analytics : owns
    Service ||--o{ Feedback : "categorizes (planned)"

    User {
        ObjectId _id PK
        string name REQUIRED
        string email REQUIRED, UNIQUE, INDEXED
        string password REQUIRED, bcrypt-hashed (salt 8)
        string otp "6-digit, 10-min expiry"
        boolean isVerified DEFAULT false
        boolean isAdmin DEFAULT false
        string avatar "profile image URL"
        date createdAt
        date updatedAt
    }

    Feedback {
        ObjectId _id PK
        ObjectId user FK REQUIRED
        number rating "1-5 REQUIRED"
        string comment
        array files "[{filename, originalname, path}]"
        date date DEFAULT now
        string mainSector "referenced in controller, NOT in model"
        string subSector "referenced in controller, NOT in model"
    }

    Service {
        ObjectId _id PK
        string name REQUIRED
        string description
        array files
        date createdAt DEFAULT now
    }

    Analytics {
        ObjectId _id PK
        ObjectId user FK REQUIRED, INDEXED
        number users DEFAULT 0
        number sessions DEFAULT 0
        number revenue DEFAULT 0
        date date DEFAULT now
    }
```

### Collections

#### Users (`users`)

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `_id` | ObjectId | Auto | Primary key |
| `name` | String | Required | User's full name |
| `email` | String | Required, Unique, Indexed | Email address |
| `password` | String | Required | bcrypt-hashed (salt rounds: 8) |
| `otp` | String | Nullable | 6-digit verification code |
| `isVerified` | Boolean | Default: false | Email verified flag |
| `isAdmin` | Boolean | Default: false | Admin role flag |
| `avatar` | String | Nullable | Avatar image URL |
| `createdAt` | Date | Auto (timestamps) | |
| `updatedAt` | Date | Auto (timestamps) | |

#### Feedback (`feedback`)

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `_id` | ObjectId | Auto | Primary key |
| `user` | ObjectId | Ref: User, Required | Feedback author |
| `rating` | Number | 1–5, Required | Service rating |
| `comment` | String | Optional | Written feedback |
| `files` | Array | `[{filename, originalname, path}]` | Attachments |
| `date` | Date | Default: now | Submission date |

> **⚠️ Needs Verification**: The `feedbackController.js` references `req.body.mainSector` and `req.body.subSector` and passes them to `Feedback.create()`, but the `Feedback.js` model schema does **not** define these fields. This is a schema-controller mismatch that may cause data loss or unexpected behavior.

#### Services (`services`)

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `_id` | ObjectId | Auto | Primary key |
| `name` | String | Required | Service name |
| `description` | String | Optional | Service description |
| `files` | Array | `[{filename, originalname, path}]` | Service attachments |
| `createdAt` | Date | Default: now | |

#### Analytics (`analytics`)

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `_id` | ObjectId | Auto | Primary key |
| `user` | ObjectId | Ref: User, Required, Indexed | User reference |
| `users` | Number | Default: 0 | Metric |
| `sessions` | Number | Default: 0 | Metric |
| `revenue` | Number | Default: 0 | Metric |
| `date` | Date | Default: now | |

---

## API Reference

### Authentication

| Method | Endpoint | Description | Auth | Request Body | Response |
|--------|----------|-------------|------|--------------|----------|
| POST | `/api/auth/register` | Register new user | Public | `{name, email, password}` | `{message, email}` |
| POST | `/api/auth/activate` | Verify OTP code | Public | `{email, otp}` | `{message, token, user}` |
| POST | `/api/auth/signin` | Login with credentials | Public | `{email, password}` | `{message, token, user}` |
| GET | `/api/auth/me` | Get current user profile | Protected | — | User object |
| POST | `/api/auth/logout` | Logout | Public | — | `{message: "Logged out"}` |
| POST | `/api/auth/avatar` | Upload avatar image | Protected | FormData `avatar` | `{message, avatar}` |

### Feedback

| Method | Endpoint | Description | Auth | Query/ Body | Response |
|--------|----------|-------------|------|-------------|----------|
| POST | `/api/feedback` | Submit feedback | Protected | multipart/form-data: `rating`, `comment`, `files` | `{success, message, feedback}` |
| GET | `/api/feedback` | List feedback (paginated) | Public | `?page=1&limit=10` | `{feedback, page, pages, total}` |

### Services

| Method | Endpoint | Description | Auth | Request Body | Response |
|--------|----------|-------------|------|--------------|----------|
| GET | `/api/services` | List all services | Public | — | Service[] |
| POST | `/api/services` | Create a new service | Admin | `{name, description}`, files | New Service |

### Dashboard & Analytics

| Method | Endpoint | Description | Auth | Response |
|--------|----------|-------------|------|----------|
| GET | `/api/dashboard` | Aggregated metrics + weekly data + citizens + feedback | Admin | `{metrics, weeklyOrderData, citizens, feedback}` |
| GET | `/api/analytics` | User-specific analytics | Protected | Analytics object |

### System

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check: `{status, message, timestamp, mongo}` |
| GET | `/` | Welcome message |

### Authentication Flow

```
CITIZEN                           BACKEND                         EMAIL
   │                                │                               │
   ├── POST /api/auth/register ────►│                               │
   │   {name, email, password}      │                               │
   │                                ├── hash password (bcrypt 8)    │
   │                                ├── generate 6-digit OTP       │
   │                                ├── save user (unverified)      │
   │                                ├── send OTP email ────────────►│
   │◄── {message, email}            │                               │
   │                                │                               │
   ├── POST /api/auth/activate ────►│                               │
   │   {email, otp}                 │                               │
   │                                ├── verify OTP match            │
   │                                ├── set isVerified=true         │
   │                                ├── generate JWT (24h expiry)  │
   │◄── {token, user}               │                               │
   │                                │                               │
   ├── POST /api/auth/signin ──────►│                               │
   │   {email, password}            │                               │
   │                                ├── find user                   │
   │                                ├── compare password            │
   │                                ├── check isVerified            │
   │                                ├── generate JWT               │
   │◄── {token, user}               │                               │
```

### Feedback Submission Flow

```
CITIZEN                         BACKEND                         MONGODB
   │                                │                              │
   ├── POST /api/feedback ────────►│                              │
   │   (multipart/form-data)       │                              │
   │   rating + comment + files    │                              │
   │                                ├── validate JWT ────────────►│
   │                                │   verify user                │
   │                                ├── upload files ────────────►│
   │                                │   (Multer → /uploads/)      │
   │                                ├── save feedback ───────────►│
   │◄── {success, message,          │                              │
   │     feedback}                  │                              │
```

### JWT Payload Structure

```json
{
  "sub": "user_objectid",
  "id": "user_objectid",
  "email": "user@example.com",
  "name": "User Name",
  "isAdmin": false,
  "avatar": null,
  "iat": 1718000000,
  "exp": 1718086400
}
```

---

## Getting Started

### Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | 18+ (LTS recommended) | Tested with v18.x |
| npm | 9+ | Comes with Node.js |
| MongoDB | 6+ | Atlas (recommended) or local |
| Resend.com | Account | For production email OTP |
| Mailtrap | Account | For development email testing |

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Bedru-Mekiyu/Group-16.git
cd civicVoice-app

# 2. Install backend dependencies
cd feedback/backend
npm install

# 3. Install frontend dependencies
cd ../frontend
npm install

# 4. Configure environment (see next section)
#    Create feedback/backend/.env and feedback/frontend/.env

# 5. Start backend (Terminal 1)
cd ../backend
npm run dev

# 6. Seed admin user (first time only — Terminal 2)
npm run seed:admin

# 7. Start frontend (Terminal 3)
cd ../frontend
npm run dev
```

Open **http://localhost:8080** in your browser.

> ⚠️ **Important**: The backend defaults to port **10000** (production on Render) but the `.env` should use `PORT=5000` for local development. The frontend Vite dev server runs on **port 8080**.

---

## Environment Variables

### Backend (`feedback/backend/.env`)

```env
# ─── Server ───
PORT=5000
NODE_ENV=development

# ─── MongoDB ───
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/civicvoice?retryWrites=true&w=majority

# ─── JWT ───
JWT_SECRET=your-secret-key-change-in-production

# ─── CORS ───
FRONTEND_ORIGIN=http://localhost:8080

# ─── Email (Mailtrap — Development) ───
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
MAILTRAP_USER=your-mailtrap-user
MAILTRAP_PASS=your-mailtrap-pass
FROM_EMAIL=noreply@civicvoice.et

# ─── Email (Resend — Production, Alternative) ───
RESEND_API_KEY=re_xxxxxxxxxxxx

# ─── Admin Seed (run once via npm run seed:admin) ───
ADMIN_EMAIL=admin@civicvoice.et
ADMIN_PASSWORD=your-admin-password
ADMIN_NAME=Administrator
```

> ⚠️ **Security Notice**: The `server.js` currently contains a hardcoded fallback MongoDB URI with credentials (line 49–50). This must be removed before production use. Rely exclusively on the `MONGODB_URI` environment variable.

### Frontend (`feedback/frontend/.env`)

```env
# API base URL (Vite exposes VITE_* vars to client)
VITE_API_BASE_URL=http://localhost:5000

# Mock mode — set to 'true' when backend is unavailable for demo
VITE_USE_MOCK=false
```

---

## Running Locally

### Development Mode

| Command | Directory | Description |
|---------|-----------|-------------|
| `npm run dev` | `feedback/backend` | Starts Express with nodemon auto-reload |
| `npm run dev` | `feedback/frontend` | Starts Vite dev server (port 8080) |
| `npm run seed:admin` | `feedback/backend` | Creates/promotes admin user (run once) |

### Production Build

```bash
# Build frontend
cd feedback/frontend
npm run build
# Output: feedback/frontend/dist/

# Start backend in production
cd feedback/backend
NODE_ENV=production npm start
```

### Demo Credentials (Mock Mode)

When `VITE_USE_MOCK=true` in the frontend `.env`, use these demo accounts created by `mockAuth.ts`:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@civicvoice.et` | `admin123` |
| **User** | `demo@civicvoice.et` | `demo123` |

Mock mode stores all data in `localStorage`, so it works fully offline. OTP codes are logged to the browser console.

---

## Development Workflow

### Available Scripts

#### Backend (`feedback/backend/package.json`)

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `node server.js` | Production start |
| `dev` | `nodemon server.js` | Development with auto-reload |
| `seed:admin` | `node scripts/seedAdmin.js` | Create admin user from env vars |
| `lint` | `eslint . --ext .js` | Lint JavaScript files |

#### Frontend (`feedback/frontend/package.json`)

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start dev server (port 8080) |
| `build` | `vite build` | Production build to `dist/` |
| `build:dev` | `vite build --mode development` | Dev build |
| `preview` | `vite preview` | Preview production build |
| `lint` | `eslint .` | Lint TypeScript/React files |

### Code Quality

| Tool | Configuration | Purpose |
|------|--------------|---------|
| ESLint 9.x | `eslint.config.js` (frontend), `.eslintrc` (backend) | JavaScript/TypeScript linting |
| TypeScript 5.8 | `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` | Type checking |
| PostCSS + Autoprefixer | `postcss.config.js` | CSS processing |
| Tailwind CSS | `tailwind.config.ts` | Utility-first CSS |

### Styling Conventions

- CSS is written with Tailwind utility classes
- Custom CSS in `src/styles/animations.css` and `src/styles/amharic-fix.css`
- CSS variables defined in `src/index.css` for theming (shadcn/ui pattern)
- Ethiopian flag colors: `--ethiopia-green`, `--ethiopia-yellow`, `--ethiopia-red`
- Gradient utilities: `bg-gradient-ethiopian`, `bg-gradient-hero`, `bg-gradient-primary`

---

## Testing

> **Current status: No tests implemented.**

Test frameworks are not configured in either `package.json`. Testing is a planned future enhancement.

| Area | Status |
|------|--------|
| Unit Tests | ❌ Not implemented |
| Integration Tests | ❌ Not implemented |
| E2E Tests | ❌ Not implemented |
| Coverage | ❌ Not configured |

---

## Deployment

### Current Deployments

| Service | URL | Platform |
|---------|-----|----------|
| **API** | `https://civicvoiceapp.onrender.com` | Render (Free Tier) |
| **Frontend** | `https://civicvoice-app-1.onrender.com` | Render |
| **Frontend Alt** | `https://civicvoiceapp-frontend.onrender.com` | Render |

### Backend — Render

1. Push `feedback/backend` code to GitHub (as root or subdirectory)
2. Create a new **Web Service** on Render
3. Configure:

| Setting | Value |
|---------|-------|
| **Build Command** | `cd feedback/backend && npm install` |
| **Start Command** | `cd feedback/backend && npm start` |
| **Health Check Path** | `/health` |

4. Add environment variables (see [Environment Variables](#environment-variables) section)
5. Deploy

> The server includes a **keep-alive** mechanism that pings `/health` every 12 minutes to prevent Render's free tier from sleeping. It runs on port **10000** (Render's default).

### Frontend — Render / Vercel / Lovable

The frontend was initially scaffolded via [Lovable](https://lovable.dev/projects/da4c7ff2-f372-4a93-bc73-e02a7f53a284) and can be deployed through:

- **Render**: Static Site with build command `cd feedback/frontend && npm install && npm run build`, publish directory `feedback/frontend/dist`
- **Vercel**: Connect Git repository → Build: `npm run build` → Output: `dist/`
- **Lovable**: Project settings → Share → Publish

> **Note**: No Docker configuration, CI/CD pipeline, or Kubernetes manifests exist in this repository.

---

## Security

### Authentication & Authorization

| Mechanism | Implementation |
|-----------|---------------|
| **JWT Tokens** | 24-hour expiry, signed with `JWT_SECRET`, contains user profile data |
| **Password Hashing** | bcryptjs with salt round 8 (pre-save hook on User model) |
| **Email Verification** | 6-digit OTP, generated via `Math.random`, sent via Mailtrap SMTP or Resend API |
| **Admin Guard** | `requireAdmin` middleware (inline in authController) checks `isAdmin` flag |
| **Protected Routes** | JWT verification via `protect` middleware on every authenticated request |
| **Frontend Route Guard** | `ProtectedRoute` component with `adminOnly` prop for admin-only pages |

### API Security

| Measure | Details |
|---------|---------|
| **CORS** | Whitelist-only origins in production, dev allows all origins |
| **JSON Body Limit** | 15MB max payload |
| **URL-encoded Limit** | 15MB |
| **File Upload** | Multer with `dest: 'uploads/'`, no type/size validation server-side |
| **Input Validation** | Zod schemas on frontend; Mongoose schema validation on backend (basic) |
| **XSS Prevention** | HTML entity encoding utilities in `src/lib/validation.ts` (sanitizeInput) and `src/utils/validation.ts` (sanitizeHtml) |
| **HTTP Security Headers** | `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection: 1; mode=block`, `Referrer-Policy: strict-origin-when-cross-origin` (in `index.html`) |

### Known Security Considerations

| Issue | Severity | Details |
|-------|----------|---------|
| Hardcoded MongoDB credentials in `server.js` | 🔴 Critical | Fallback URI on line 49-50 contains plaintext credentials |
| No server-side file validation in Multer | 🟡 Medium | Multer accepts any file type; only client-side validation exists |
| No rate limiting on auth endpoints | 🟡 Medium | No `express-rate-limit` or similar — vulnerable to brute force |
| OTP generated with `Math.random()` | 🟡 Medium | Not cryptographically secure RNG |
| No input sanitization server-side for comments | 🟢 Low | Mongoose schema validation is minimal |
| JWT payload includes sensitive fields | 🟢 Low | Email, name, admin status in token (not hashed) |

---

## Internationalization

CivicVoice Et supports 7 languages through a React Context-based i18n system (`LanguageContext`).

| Language | Code | Script | Coverage |
|----------|------|--------|----------|
| English | `en` | Latin | ✅ Complete (366 keys) |
| Amharic | `am` | Ethiopic | ✅ Complete (227 keys) |
| Oromo | `om` | Latin | ⚠️ Partial (~40 keys) |
| Tigrinya | `ti` | Ethiopic | ⚠️ Partial (~15 keys) |
| Somali | `so` | Latin | ⚠️ Partial (~15 keys) |
| Afar | `aa` | Latin | ⚠️ Partial (~15 keys) |
| Gurage | `gur` | Ethiopic | ⚠️ Partial (~15 keys) |

### Translation Coverage

Translation keys cover: navigation, landing page, login, signup, dashboard, services, FAQ, contact, help center, footer, settings, and common UI elements.

- English: 366 translation keys (full coverage)
- Amharic: 227 translation keys (all major sections)
- Other languages: Primarily navigation + landing + auth + basic UI

### Implementation

- `LanguageContext.tsx` provides `t(key)`, `translate(key, fallback)`, `setLanguage(lang)`
- Language persisted in `localStorage`
- Document `lang` attribute updates on change
- Amharic text rendering fix via injected CSS (Ethiopic script support)
- All layouts remain LTR (no RTL support)
- `LanguageSelector` component in the navigation bar

---

## Project Structure

```
civicVoice-app/
├── README.md                          # This file
├── .gitignore                         # Node + VSCode + env + dist

├── feedback/
│   ├── backend/                       # Express.js API server
│   │   ├── config/
│   │   │   └── db.js                  # MongoDB connection (MongoClient, unused by server.js)
│   │   ├── controllers/
│   │   │   ├── authController.js      # Register, OTP, login, JWT, profile, avatar
│   │   │   ├── feedbackController.js  # Submit + list feedback
│   │   │   ├── dashboardController.js # Aggregate metrics, weekly trends, citizens
│   │   │   └── analyticsController.js # Per-user analytics
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js      # ⚠️ Empty file
│   │   │   ├── errorMiddleware.js     # ⚠️ Empty file
│   │   │   └── roleMiddleware.js      # ⚠️ Empty file
│   │   ├── models/
│   │   │   ├── User.js                # User schema (name, email, password, OTP, roles)
│   │   │   ├── Feedback.js            # Feedback schema (rating, comment, files)
│   │   │   ├── Service.js             # Service schema (name, description, files)
│   │   │   ├── Analytics.js           # Analytics schema (users, sessions, revenue)
│   │   │   ├── Institution.js         # ⚠️ Empty — placeholder for future
│   │   │   └── sectors.js             # ⚠️ Empty — placeholder for future
│   │   ├── routes/
│   │   │   ├── auth.js                # 6 auth routes (register, signin, activate, me, logout, avatar)
│   │   │   ├── feedback.js            # 2 feedback routes (POST submit, GET list with pagination)
│   │   │   ├── services.js            # 2 service routes (GET list, POST create)
│   │   │   ├── dashboard.js           # 1 dashboard route (GET aggregate)
│   │   │   ├── analytics.js           # 1 analytics route (GET per-user)
│   │   │   └── analyticsRoutes.js     # ⚠️ Empty — duplicate file
│   │   ├── scripts/
│   │   │   └── seedAdmin.js           # Admin user seeder (from env vars)
│   │   ├── utils/
│   │   │   ├── sendEmail.js           # Resend.com email integration (alternative to Mailtrap)
│   │   │   └── validators.js          # ⚠️ Empty file
│   │   ├── uploads/                   # Uploaded files directory (auto-created)
│   │   ├── server.js                  # Entry point: Express app, CORS, MongoDB, routes, keep-alive
│   │   ├── package.json               # Backend dependencies + scripts
│   │   └── package-lock.json
│   │
│   └── frontend/                      # React + Vite + TypeScript SPA
│       ├── src/
│       │   ├── pages/                 # 32 page components
│       │   │   ├── Landing.tsx        # Hero, features, CTA, stats, animations
│       │   │   ├── EnhancedLogin.tsx   # Login form with demo credentials
│       │   │   ├── EnhancedSignup.tsx  # Registration with OTP verification
│       │   │   ├── AdminDashboard.tsx  # Full admin dashboard (966 lines)
│       │   │   ├── CitizenDashboard.tsx # User feedback history
│       │   │   ├── Feedback.tsx       # Feedback submission form (447 lines)
│       │   │   ├── Services.tsx       # Service listing page
│       │   │   ├── About.tsx, Contact.tsx, FAQ.tsx, HelpCenter.tsx
│       │   │   ├── GovernmentServices.tsx, PublicReports.tsx
│       │   │   ├── IssueTracking.tsx, DataAnalytics.tsx
│       │   │   ├── ReportingTools.tsx, GovernmentPortal.tsx
│       │   │   ├── HowItWorks.tsx, Documentation.tsx
│       │   │   ├── OurMission.tsx, TermsOfService.tsx
│       │   │   ├── PrivacyPolicy.tsx, DataUsagePolicy.tsx
│       │   │   ├── Demo.tsx, AboutPlatform.tsx
│       │   │   ├── UserProfile.tsx, Settings.tsx
│       │   │   ├── AdminLogin.tsx, Login.tsx, Signup.tsx
│       │   │   ├── Index.tsx, NotFound.tsx
│       │   │   └── (32 total)
│       │   ├── components/
│       │   │   ├── ui/               # 49 shadcn/ui components
│       │   │   ├── Navigation.tsx     # Responsive navbar, avatar, theme/language selectors
│       │   │   ├── ProtectedRoute.tsx # Auth + admin route guard
│       │   │   ├── SEOHead.tsx        # Helmet meta tags (OG, Twitter, JSON-LD)
│       │   │   ├── ThemeToggle.tsx    # Light/dark mode toggle
│       │   │   ├── LanguageSelector.tsx # Language switcher dropdown
│       │   │   ├── PWAInstallPrompt.tsx # PWA install banner
│       │   │   ├── ErrorBoundary.tsx  # React error boundary
│       │   │   ├── EmptyState.tsx     # Empty data state component
│       │   │   ├── LoadingSpinner.tsx, LoadingSkeleton.tsx
│       │   │   ├── Breadcrumb.tsx, NotificationToast.tsx
│       │   │   ├── PasswordStrengthMeter.tsx
│       │   │   ├── NewsletterSignup.tsx
│       │   │   └── EthiopianFlagBadge.tsx
│       │   ├── contexts/
│       │   │   └── LanguageContext.tsx  # i18n context (7 languages, 821 lines)
│       │   ├── hooks/
│       │   │   ├── use-toast.ts        # Toast notification hook
│       │   │   ├── useApi.ts           # Generic async API hook
│       │   │   ├── useDebounce.ts      # Debounce hook
│       │   │   ├── useFormValidation.ts # Form validation hook
│       │   │   ├── useIntersectionObserver.ts # Scroll tracking
│       │   │   ├── useLocalStorage.ts  # Persistent state hook
│       │   │   ├── useOptimisticUpdate.ts # Optimistic UI hook
│       │   │   └── use-mobile.tsx      # Mobile detection hook
│       │   ├── lib/
│       │   │   ├── api.ts              # API client (fetch wrapper, mock fallback)
│       │   │   ├── auth.ts             # Token storage (localStorage)
│       │   │   ├── mockAuth.ts         # Mock auth for offline demo
│       │   │   ├── mockDashboard.ts    # Mock dashboard data (citizens, feedback, charts)
│       │   │   ├── utils.ts            # cn() helper (clsx + tailwind-merge)
│       │   │   ├── validation.ts       # Zod schemas (login, register, feedback, OTP, contact)
│       │   │   └── performance.ts      # Debounce, throttle, image compression, localStorage helpers
│       │   ├── schemas/
│       │   │   └── feedback.schema.ts  # Zod schemas for feedback, user profile, auth
│       │   ├── utils/
│       │   │   ├── analytics.ts        # Client-side event tracking (page views, errors, forms)
│       │   │   ├── emailService.ts     # Email/SMS OTP service (placeholder)
│       │   │   └── validation.ts       # Zod schemas + sanitize + rate limiter
│       │   ├── styles/
│       │   │   ├── animations.css      # Page load animations, staggered reveals
│       │   │   └── amharic-fix.css     # Ethiopic font rendering fixes
│       │   ├── assets/
│       │   │   └── react.svg
│       │   ├── App.tsx                 # Root component (routes, providers, layout)
│       │   ├── main.tsx                # Entry point (Helmet, Router, Suspense, lazy App)
│       │   ├── index.css               # Tailwind directives + CSS variables + theme
│       │   └── vite-env.d.ts
│       ├── public/
│       │   ├── sw.js                   # Service Worker (159 lines, cache + fetch strategies)
│       │   ├── site.webmanifest        # PWA manifest (installable, shortcuts, screenshots)
│       │   ├── robots.txt              # SEO robots
│       │   ├── placeholder.svg         # Placeholder image
│       │   └── (various PNG images)
│       ├── index.html                  # SEO meta, OG tags, Twitter Cards, JSON-LD, PWA
│       ├── vite.config.ts              # Vite config (React SWC, @ alias, dev port 8080)
│       ├── tailwind.config.ts          # Tailwind config (Ethiopian colors, animations)
│       ├── tsconfig.json               # TypeScript config (references)
│       ├── tsconfig.app.json           # App TypeScript config
│       ├── tsconfig.node.json          # Node TypeScript config
│       ├── eslint.config.js            # ESLint flat config (TypeScript + React)
│       ├── postcss.config.js           # PostCSS + Tailwind + Autoprefixer
│       ├── components.json             # shadcn/ui configuration
│       ├── package.json                # Frontend dependencies + scripts
│       └── package-lock.json

(158 files total across the project)
```

---

## Contributing

### Getting Started

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following existing code conventions
4. Commit your changes:
   ```bash
   git commit -m "feat: add your feature description"
   ```
5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Open a Pull Request with a clear description

### Guidelines

- Follow existing code style (see [Code Quality](#code-quality))
- Run `npm run lint` before committing
- Keep PRs focused on single concerns
- Update the internationalization files when adding UI text
- Test both light and dark themes
- Ensure responsive design on mobile viewports
- Do **not** commit `.env` files or hardcoded credentials

### Known Areas for Contribution

| Area | Description | Difficulty |
|------|-------------|------------|
| **Tests** | No test framework exists — needs full setup | Medium |
| **Rate Limiting** | Implement `express-rate-limit` on auth routes | Easy |
| **File Validation** | Add server-side file type/size validation in Multer | Easy |
| **Feedback Schema** | Fix `mainSector`/`subSector` field mismatch | Easy |
| **Empty Files** | Implement or remove 5 empty placeholder files | Easy |
| **CI/CD** | Add GitHub Actions for lint + build | Medium |
| **Docker** | Dockerfile + docker-compose for backend/frontend | Medium |
| **Oromo Translation** | Complete the ~40 existing or missing keys | Easy |
| **Tigrinya/Somali/Afar/Gurage** | Full translation coverage needed | Medium |

---

## Roadmap

| Feature | Priority | Status |
|---------|----------|--------|
| Multilingual support (full coverage for all 7 languages) | Medium | 🔄 In Progress |
| Email notifications for new feedback | Low | 📋 Planned |
| Advanced rate limiting on auth endpoints | Medium | 📋 Planned |
| Unit, integration, and E2E tests | High | 📋 Planned |
| Docker & CI/CD pipeline | Medium | 📋 Planned |
| SMS OTP verification | Low | 📋 Planned |
| Real-time notifications (WebSocket) | Low | 📋 Planned |
| Feedback analytics with ML insights | Low | 💭 Future |
| Institution management | Low | 💭 Future |
| Sector management (hierarchical sectors) | Low | 💭 Future |

---

## FAQ

<details>
<summary><b>How do I create an admin account?</b></summary>

Admin accounts are created via the `npm run seed:admin` script. Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_NAME` in your `feedback/backend/.env` file, then run the script once. There is no admin self-registration.
</details>

<details>
<summary><b>Can I use the app without a backend?</b></summary>

Yes! Set `VITE_USE_MOCK=true` in `feedback/frontend/.env`. The app will use `localStorage` for all data and comes with pre-seeded demo accounts.
</details>

<details>
<summary><b>How does email verification work?</b></summary>

The backend uses Mailtrap SMTP (development) via Nodemailer as the primary email provider. An alternative `utils/sendEmail.js` uses the Resend.com SDK. A 6-digit OTP is generated and sent to the user's email with a 10-minute expiry.
</details>

<details>
<summary><b>What MongoDB setup is needed?</b></summary>

MongoDB Atlas is recommended. Create a free cluster, whitelist your IP, get the connection string, and set it as `MONGO_URI` in your `.env`. The connection uses `maxPoolSize: 10` and `serverSelectionTimeoutMS: 8000`.
</details>

<details>
<summary><b>Why are some middleware files empty?</b></summary>

Auth middleware (`protect`, `requireAdmin`) is implemented directly in `authController.js` rather than in separate middleware files. The empty `middleware/` files are placeholders for future refactoring.
</details>

<details>
<summary><b>What's the difference between sendEmail.js and the email in authController?</b></summary>

`authController.js` uses **Nodemailer with Mailtrap SMTP** for OTP delivery. `utils/sendEmail.js` is an alternative implementation using the **Resend.com SDK**. Both serve the same purpose, using different providers depending on configuration.
</details>

---

## License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 CivicVoice Et Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Team

| Name | Role | Contact |
|------|------|---------|
| **Bedru Mekiyu** | Developer | bedru.mekiyu-ug@aau.edu.et |
| **Robel Wondwosen** | Developer | — |
| **Kirubel Bishaw** | Developer | — |
| **Tsegamlak Bizuneh** | Developer | — |

**University**: Addis Ababa University, Bole Sub-city, Addis Ababa, Ethiopia

---

## Acknowledgements

- **[shadcn/ui](https://ui.shadcn.com/)** — Beautifully designed React components
- **[Lovable](https://lovable.dev)** — Initial frontend scaffolding
- **[Render](https://render.com)** — Free tier hosting
- **[Resend](https://resend.com)** — Email delivery
- **[Mailtrap](https://mailtrap.io)** — Email testing
- **[Recharts](https://recharts.org)** — Charting library
- **[TanStack Query](https://tanstack.com/query)** — Data fetching
- **[Lucide](https://lucide.dev)** — Icons

---

<p align="center">
  <sub>Built with ❤️ for Ethiopian civic engagement at Addis Ababa University</sub>
  <br>
  <sub>
    <a href="https://github.com/Bedru-Mekiyu/Group-16/issues">Report Issue</a> •
    <a href="mailto:bedru.mekiyu-ug@aau.edu.et">Contact Us</a>
  </sub>
</p>
