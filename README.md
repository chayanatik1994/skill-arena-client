# SkillArena - Contest Management Platform

A modern, full-stack web application for creating, discovering, participating in, and managing creative contests.

## 🌐 Live Site

**Client:** [Add your deployed client URL here]  
**Server:** [Add your deployed server URL here]

## ✨ Features

- **🔐 Secure Authentication**: Firebase Authentication with Email/Password and Google Sign-in, JWT token-based API security
- **👥 Role-Based Access Control**: Three distinct user roles (Admin, Contest Creator, Normal User) with role-specific dashboards
- **💳 Payment Integration**: Stripe payment gateway for secure contest registration and entry fee processing
- **🏆 Contest Management**: Create, edit, delete, and manage contests with approval workflow
- **📊 Leaderboard System**: Dynamic ranking of users based on contest wins with win percentage calculations
- **📈 Statistics Dashboard**: Comprehensive platform statistics including user counts, contest metrics, revenue tracking, and visual charts
- **🔍 Advanced Search**: Search contests by type and name with backend filtering
- **📱 Fully Responsive**: Mobile-first design that works seamlessly on all devices (mobile, tablet, desktop)
- **🌓 Dark/Light Theme**: Theme toggle with localStorage persistence that maintains user preference across sessions
- **📝 Task Submissions**: Submit completed tasks with links, view submissions, and declare winners
- **💰 Payment Tracking**: Track payment status for all participated contests
- **📄 Pagination**: Efficient data display with pagination (10 items per page) for better performance
- **🎨 Modern UI/UX**: Beautiful interface built with DaisyUI and Tailwind CSS
- **⚡ Optimized Data Fetching**: TanStack Query for efficient data management, caching, and automatic refetching
- **🛡️ Protected Routes**: Private routes that persist authentication state after page refresh
- **📊 Win Statistics**: User profile with win percentage charts and participation tracking
- **🏅 Winner Declaration**: Contest creators can declare winners after deadline with participant details
- **📋 Contest Filtering**: Filter contests by type (Image Design, Article Writing, Business Ideas, etc.)
- **⏰ Deadline Countdown**: Live countdown timer showing time remaining for contest submissions
- **📱 About & Statistics Pages**: Additional informative pages about the platform and real-time statistics

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and state management
- **Firebase Authentication** - User authentication
- **Stripe** - Payment processing
- **DaisyUI + Tailwind CSS** - Styling framework
- **React Hook Form** - Form management
- **Recharts** - Data visualization
- **SweetAlert2** - Beautiful alerts and notifications

### Backend
- **Node.js + Express** - Server framework
- **MongoDB** - Database
- **JWT** - Secure API authentication
- **Stripe API** - Payment processing
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- Firebase project
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd skill-arena
   ```

2. **Install server dependencies**
   ```bash
   cd skill-arena-server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../skill-arena-client
   npm install
   ```
<<<<<<< HEAD
=======

4. **Environment Variables**

   **Server (.env)**
   ```
   PORT=3000
   DB_USER=your_mongodb_username
   DB_PASS=your_mongodb_password
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

   **Client (.env)**
   ```
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   VITE_image_host_key=your_imgbb_api_key
   ```

5. **Run the application**
   ```bash
   # Terminal 1 - Server
   cd skill-arena-server
   npm start

   # Terminal 2 - Client
   cd skill-arena-client
   npm run dev
   ```

>>>>>>> 5b1652f (Update project files with Stripe integration and fixes)
## 📁 Project Structure

```
skill-arena/
├── skill-arena-client/
│   ├── src/
│   │   ├── Pages/
│   │   │   ├── Home/
│   │   │   ├── AllContests/
│   │   │   ├── Dashboard/
│   │   │   │   ├── admin/
│   │   │   │   ├── creator/
│   │   │   │   └── user/
│   │   │   ├── Auth/
│   │   │   ├── Leaderboard/
│   │   │   ├── Statistics/
│   │   │   └── About/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   └── routes/
│   └── package.json
└── skill-arena-server/
    ├── index.js
    └── package.json
```

## 🎯 Key Features Breakdown

### User Roles

1. **Normal User**
   - Browse and search contests
   - Register for contests (with payment)
   - Submit tasks
   - View participated and winning contests
   - Update profile with win statistics

2. **Contest Creator**
   - Create new contests
   - Edit/delete pending contests
   - View and manage submissions
   - Declare winners
   - Track contest performance

3. **Admin**
   - Approve/reject contests
   - Manage all users (change roles, delete)
   - Manage all contests
   - View platform statistics

### Pages

- **Home**: Banner with search, popular contests, winner advertisement, extra section
- **All Contests**: Filterable contest listing with tabs by type
- **Contest Details**: Full contest information, payment, task submission
- **Leaderboard**: Ranked users by contest wins
- **Statistics**: Platform-wide analytics and charts
- **About**: Information about the platform
- **Dashboard**: Role-based dashboards for each user type

## 🔒 Security Features

- JWT token authentication for all protected API routes
- Role-based access control
- Secure payment processing with Stripe
- Environment variables for sensitive data
- Protected routes with authentication persistence

## 📝 Notes

- First registered user automatically becomes admin
- Contests require admin approval before being visible
- Payment is required to participate in contests
- Only one winner per contest
- Contest creators can only edit/delete pending contests

## 👤 Default Admin Credentials

**Email:** admin@skill-arena.com  
**Password:** pass@admin

*(Note: Register this email with Firebase Authentication to complete admin setup)*

## 📄 License

This project is part of a coding challenge/assignment.

## 👨‍💻 Developer

Built with ❤️ using MERN stack

---

**Note:** Remember to add your actual deployment URLs and update environment variables before deploying!
