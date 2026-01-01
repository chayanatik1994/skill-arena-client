SkillArena - Contest Management Platform

A modern, full-stack web application for creating, discovering, participating in, and managing creative contests.

🌐 Live Site

Client: https://your-client-netlify-url.netlify.app

Server: https://magical-brigadeiros-dfe948.netlify.app

✨ Features

🔐 Secure Authentication: Firebase Authentication (Email/Password & Google sign-in), JWT token-based API security.

👥 Role-Based Access Control: Admin, Contest Creator, and Normal User with role-specific dashboards.

💳 Payment Integration: Stripe for secure contest registration and entry fee processing.

🏆 Contest Management: Create, edit, delete, and manage contests with approval workflow.

📊 Leaderboard System: Dynamic ranking of users with win percentage calculations.

📈 Statistics Dashboard: Platform metrics, revenue tracking, and visual charts.

🔍 Advanced Search: Search contests by type and name with backend filtering.

📱 Fully Responsive: Works seamlessly on mobile, tablet, and desktop.

🌓 Dark/Light Theme: Theme toggle with localStorage persistence.

📝 Task Submissions: Submit tasks, view submissions, and declare winners.

💰 Payment Tracking: Track payment status for all participated contests.

📄 Pagination: Efficient data display (10 items per page).

🎨 Modern UI/UX: Built with DaisyUI and Tailwind CSS.

⚡ Optimized Data Fetching: TanStack Query for caching and automatic refetching.

🛡️ Protected Routes: Persist authentication state after page refresh.

📊 Win Statistics: User profiles with win percentage charts.

🏅 Winner Declaration: Contest creators declare winners after deadlines.

📋 Contest Filtering: Filter contests by type (e.g., Image Design, Article Writing, Business Ideas).

⏰ Deadline Countdown: Live countdown for contest submissions.

📱 About & Statistics Pages: Informative pages with real-time analytics.

🛠️ Tech Stack
Frontend

React 19, Vite, React Router

TanStack Query, Firebase Authentication, Stripe

DaisyUI + Tailwind CSS, React Hook Form, Recharts, SweetAlert2

Backend

Node.js + Express, MongoDB

JWT for API authentication

Stripe API integration

CORS for cross-origin requests

🚀 Getting Started
Prerequisites

Node.js (v18+)

MongoDB Atlas account (or local MongoDB)

Firebase project

Stripe account

Installation
# Clone repository
git clone [https://github.com/chayanatik1994/skill-arena-client.git]
cd skill-arena

# Install server dependencies
cd skill-arena-server
npm install

# Install client dependencies
cd ../skill-arena-client
npm install

Running the Application
# Terminal 1 - Server
cd skill-arena-server
npm start

# Terminal 2 - Client
cd skill-arena-client
npm run dev


Note: Sensitive configuration values (Firebase, MongoDB, Stripe) are now directly configured in code or secured via deployment platform secrets. No .env file is required locally.

📁 Project Structure
skill-arena/
├── skill-arena-client/
│   ├── src/
│   │   ├── Pages/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   └── routes/
│   └── package.json
└── skill-arena-server/
    ├── index.js
    └── package.json

🎯 Key Features Breakdown
User Roles

Normal User: Browse/search contests, register, submit tasks, view results, update profile.

Contest Creator: Create/edit/delete contests (pending), manage submissions, declare winners.

Admin: Approve/reject contests, manage users and contests, view statistics.

Pages

Home, All Contests, Contest Details, Leaderboard, Statistics, About, Role-based Dashboards

🔒 Security Features

JWT authentication and role-based access

Secure Stripe payments

Protected routes with persisted login

👤 Default Admin Credentials

Email: admin@skill-arena.com

Password: pass@admin

(Register this email in Firebase Authentication to enable admin access)

📄 License

This project is part of a coding challenge/assignment.

👨‍💻 Developer

Built with ❤️ using the MERN stack.