# SkillArena

A modern, user-friendly contest management platform where users can create, discover, participate in, and manage creative contests. The platform supports three user roles: Admin, Contest Creator, and Normal User, with secure authentication, role-based dashboards, and payment integration.
## Features
1. Browse and explore all available contests by type.  
2. Participate in contests after successful payment.  
3. Contest Creators can add, edit, and manage their own contests.  
4. Admins can approve, reject, and delete contests and manage user roles.  
5. Winners can be declared with name, photo, and prize displayed.  
6. Fully responsive UI for mobile, tablet, and desktop.  
7. Dark/Light theme toggle with preference saved in `localStorage`.  
8. SweetAlert/Toast notifications for login, signup, and all CRUD actions.  
9. Private routes stay logged in after page refresh.  
10. Leaderboard ranks users by number of contest wins.  

## User Roles
- **Admin:** Approve/reject contests, manage users.  
- **Contest Creator:** Add, edit, manage contests, declare winners.  
- **Normal User:** Join contests, view participated and winning contests, update profile.  

## Technology Stack
- **Frontend:** React, TanStack Query, react-hook-form, SweetAlert, DaisyUI
- **Backend:** Node.js, Express, MongoDB, JWT authentication  
- **Deployment:**  Vercel  