import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Home from '../Pages/Home/Home/Home';
import HowSkillArenaWorks from '../Pages/HowSkillArenaWorks';
import AllContests from '../Pages/AllContests/AllContests';
import PopularContests from '../Pages/Home/PopularContests/PopularContests';
import ContestDetailsPage from '../Pages/AllContests/ContestDetails';
import Payment from '../Pages/Payment/Payment';
import Leaderboard from '../Pages/Leaderboard/Leaderboard';
import Statistics from '../Pages/Statistics/Statistics';
import About from '../Pages/About/About';
import MyProfile from '../Pages/Dashboard/user/MyProfile';
import MyParticipatedContests from '../Pages/Dashboard/user/MyParticipatedContests';
import MyWinningContests from '../Pages/Dashboard/user/WinningContests';
import AddContest from '../Pages/Dashboard/creator/AddContest';
import MyCreatedContests from '../Pages/Dashboard/creator/MyCreatedContests';
import EditContest from '../Pages/Dashboard/creator/EditContest';
import Submissions from '../Pages/Dashboard/creator/Submissions';
import ManageUsers from '../Pages/Dashboard/admin/ManageUsers';
import ManageContests from '../Pages/Dashboard/admin/ManageContests';
import Login from '../Pages/Auth/Login/Login';
import Register from '../Pages/Auth/Register/Register';
import ForgotPassword from '../Pages/Auth/ForgetPassword';
import PageNotFound from '../Pages/PageNotFound/PageNotFound';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'extra', element: <HowSkillArenaWorks /> },
      { path: 'contests', element: <AllContests /> },
      { path: 'popular-contests', element: <PrivateRoute><PopularContests /></PrivateRoute> },
      { path: 'contests/:id', element: <PrivateRoute><ContestDetailsPage /></PrivateRoute> },
      { path: 'contests/:id/payment', element: <PrivateRoute><Payment /></PrivateRoute> },
      { path: 'leaderboard', element: <Leaderboard /> },
      { path: 'statistics', element: <Statistics /> },
      { path: 'about', element: <About /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <MyProfile /> },
      { path: 'my-profile', element: <MyProfile /> },

      // User
      { path: 'my-participated-contests', element: <PrivateRoute role="user"><MyParticipatedContests /></PrivateRoute> },
      { path: 'my-winning-contests', element: <PrivateRoute role="user"><MyWinningContests /></PrivateRoute> },

      // Creator
      { path: 'add-contest', element: <PrivateRoute role="creator"><AddContest /></PrivateRoute> },
      { path: 'my-created-contests', element: <PrivateRoute role="creator"><MyCreatedContests /></PrivateRoute> },
      { path: 'edit-contest/:id', element: <PrivateRoute role="creator"><EditContest /></PrivateRoute> },
      { path: 'submissions/:contestId', element: <PrivateRoute role="creator"><Submissions /></PrivateRoute> },

      // Admin
      { path: 'manage-users', element: <PrivateRoute role="admin"><ManageUsers /></PrivateRoute> },
      { path: 'manage-contests', element: <PrivateRoute role="admin"><ManageContests /></PrivateRoute> },
    ],
  },
  { path: '*', element: <PageNotFound /> },
]);
