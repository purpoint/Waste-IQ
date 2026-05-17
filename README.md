# WasteIQ — AI Food Waste Reduction Platform

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-waste--iq--plum.vercel.app-a855f7?style=for-the-badge&logo=vercel)](https://waste-iq-plum.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Waste--IQ-f472b6?style=for-the-badge&logo=github)](https://github.com/purpoint/Waste-IQ)
[![API](https://img.shields.io/badge/API-wasteiq--backend.onrender.com-fb923c?style=for-the-badge)](https://wasteiq-backend.onrender.com/api/health)

**An AI-powered SaaS platform that helps restaurants reduce food waste, predict demand, and optimize inventory using machine learning.**

🚀 [Live Demo](https://waste-iq-plum.vercel.app) &nbsp;|&nbsp; 🔑 [Demo Login](#demo-credentials) &nbsp;|&nbsp; ⚙️ [API Health](https://wasteiq-backend.onrender.com/api/health)

</div>

---

## 🎯 Problem Statement

Restaurants waste thousands of rupees every day due to over-ordering, poor demand forecasting, and manual inventory tracking. WasteIQ solves this with AI-powered insights, real-time inventory intelligence, and smart waste tracking.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Chat Assistant** | Ask anything about your inventory — powered by Groq AI with real restaurant data |
| 📊 **Real-time Dashboard** | Live stats, waste trends, demand patterns, and revenue analytics |
| 📦 **Inventory Management** | Track ingredients, expiry dates, suppliers, and stock levels with CRUD |
| 🗑️ **Waste Tracker** | Log food waste, analyze patterns, and measure financial losses |
| 📈 **Analytics & PDF Reports** | Charts, trends, and downloadable PDF report export |
| 🔔 **Smart Alerts** | Low stock, expiry warnings, and demand spike notifications |
| 🔐 **JWT Authentication** | Secure login with role-based access (Admin, Owner, Staff) |
| 📱 **Mobile Responsive** | Fully responsive design with hamburger navigation |

---

## 🛠️ Tech Stack

### Frontend
![Next.js](https://img.shields.io/badge/Next.js_14-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22C55E?style=flat)
![Zustand](https://img.shields.io/badge/Zustand-orange?style=flat)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)

### AI & Deployment
![Groq AI](https://img.shields.io/badge/Groq_AI-F55036?style=flat)
![Vercel](https://img.shields.io/badge/Vercel-black?style=flat&logo=vercel)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=black)

---

## 🔑 Demo Credentials

URL:      https://waste-iq-plum.vercel.app
Email:    demo@wasteiq.com
Password: demo123456

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+
- PostgreSQL

### Clone & Setup

```bash
git clone https://github.com/purpoint/Waste-IQ.git
cd Waste-IQ
```

### Frontend
```bash
cd frontend
npm install
# Create .env.local with NEXT_PUBLIC_API_URL=http://localhost:8080/api
npm run dev
```

### Backend
```bash
cd backend
npm install
# Create .env with DATABASE_URL, JWT_SECRET, GROQ_API_KEY
npx prisma migrate dev
npm run seed
npm run dev
```

---

## 📁 Project Structure

Waste-IQ/
├── frontend/              # Next.js 14 app
│   ├── app/
│   │   ├── (auth)/        # Login & Signup
│   │   └── (dashboard)/   # Protected pages
│   ├── components/        # UI Components
│   ├── lib/               # API functions
│   └── store/             # Zustand state
│
└── backend/               # Node.js Express API
├── src/
│   ├── controllers/   # Business logic
│   ├── routes/        # API endpoints
│   └── middleware/    # Auth & validation
└── prisma/            # Schema & migrations

---

## 🔌 API Endpoints

POST   /api/auth/register        # Create account
POST   /api/auth/login           # Login
GET    /api/auth/me              # Current user
GET    /api/inventory            # List inventory
POST   /api/inventory            # Add item
PUT    /api/inventory/:id        # Update item
DELETE /api/inventory/:id        # Delete item
GET    /api/waste                # List waste logs
POST   /api/waste                # Log waste
DELETE /api/waste/:id            # Delete log
GET    /api/analytics            # Full analytics
GET    /api/analytics/dashboard  # Dashboard stats
POST   /api/ai/chat              # AI chat
GET    /api/ai/insights          # AI insights

---

## 👨‍💻 Author

**Manan N Ghodasara**

[![GitHub](https://img.shields.io/badge/GitHub-purpoint-181717?style=flat&logo=github)](https://github.com/purpoint)

---

<div align="center">
Built with ❤️ to reduce food waste &nbsp;·&nbsp; © 2026 WasteIQ
</div>

