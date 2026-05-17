# WasteIQ — AI Food Waste Reduction Platform

<div align="center">

![WasteIQ Banner](https://waste-iq-plum.vercel.app/og-image.png)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-waste--iq--plum.vercel.app-a855f7?style=for-the-badge&logo=vercel)](https://waste-iq-plum.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Waste--IQ-f472b6?style=for-the-badge&logo=github)](https://github.com/purpoint/Waste-IQ)

**An AI-powered SaaS platform that helps restaurants, cafes, and food businesses reduce food waste, predict demand, and optimize inventory using machine learning.**

[🚀 Live Demo](https://waste-iq-plum.vercel.app) · [📧 Demo Login](#demo-credentials) · [⚙️ API](https://wasteiq-backend.onrender.com/api/health)

</div>

---

## 🎯 Problem Statement

Restaurants waste thousands of rupees every day due to:
- Over-ordering ingredients
- Poor demand forecasting
- Manual inventory tracking
- No spoilage prediction

**WasteIQ solves this with AI-powered demand forecasting, real-time inventory intelligence, and smart waste tracking.**

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Chat Assistant** | Ask anything about your inventory — powered by Groq AI with real restaurant data context |
| 📊 **Real-time Dashboard** | Live stats, waste trends, demand patterns, and revenue analytics |
| 📦 **Inventory Management** | Track ingredients, expiry dates, suppliers, and stock levels |
| 🗑️ **Waste Tracker** | Log food waste, analyze patterns, and measure financial losses |
| 📈 **Analytics & Reports** | Charts, trends, and PDF report export |
| 🔔 **Smart Alerts** | Low stock, expiry warnings, and demand spike notifications |
| 🔐 **JWT Authentication** | Secure login with role-based access (Admin, Owner, Staff) |
| 📱 **Mobile Responsive** | Works perfectly on all devices |

---

## 🛠️ Tech Stack

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=flat&logo=framer&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22C55E?style=flat)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)

### AI & Deployment
![Groq](https://img.shields.io/badge/Groq%20AI-F55036?style=flat)
![Vercel](https://img.shields.io/badge/Vercel-black?style=flat&logo=vercel)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=black)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- PostgreSQL

### Clone the repo
```bash
git clone https://github.com/purpoint/Waste-IQ.git
cd Waste-IQ
```

### Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

### Setup Backend
```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run seed
npm run dev
```

---

## 🔑 Demo Credentials

Email:    demo@wasteiq.com
Password: demo123456

🌐 Live at: **https://waste-iq-plum.vercel.app**

---

## 📁 Project Structure

wasteiq/
├── frontend/          # Next.js 14 app
│   ├── app/           # App Router pages
│   ├── components/    # Reusable components
│   ├── lib/           # API functions
│   ├── store/         # Zustand state
│   └── types/         # TypeScript types
│
├── backend/           # Node.js API
│   ├── src/
│   │   ├── controllers/   # Business logic
│   │   ├── routes/        # API endpoints
│   │   ├── middleware/     # Auth & validation
│   │   └── lib/           # Prisma client
│   └── prisma/        # Schema & migrations


---

## 🔌 API Endpoints

POST   /api/auth/register     # Create account
POST   /api/auth/login        # Login
GET    /api/auth/me           # Get current user
GET    /api/inventory         # List inventory
POST   /api/inventory         # Add item
PUT    /api/inventory/:id     # Update item
DELETE /api/inventory/:id     # Delete item
GET    /api/waste             # List waste logs
POST   /api/waste             # Log waste
DELETE /api/waste/:id         # Delete log
GET    /api/analytics         # Full analytics
GET    /api/analytics/dashboard  # Dashboard stats
POST   /api/ai/chat           # AI chat
GET    /api/ai/insights       # AI insights

---

## 👨‍💻 Author

**Manan Patel**

[![GitHub](https://img.shields.io/badge/GitHub-purpoint-181717?style=flat&logo=github)](https://github.com/purpoint)

---

<div align="center">
Built with ❤️ to reduce food waste · © 2026 WasteIQ
</div>

