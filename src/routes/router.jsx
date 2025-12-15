import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";

import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import ForgotPassword from "../Pages/Auth/ForgetPassword";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import PrivateRoute from "./PrivateRoute";
import AllContests from "../Pages/AllContests/AllContests";
import ContestDetailsPage from "../Pages/ContestDetailsPage";
import HowSkillArenaWorks from "../Pages/HowSkillArenaWorks";
import DashboardLayout from "../layouts/DashboardLayout";
import UserDashboard from "../Pages/Dashboard/MyUser/UserDashboard";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "extra", Component: HowSkillArenaWorks },
      {
        path: "contests",
        element: (
          <PrivateRoute>
            <AllContests />
          </PrivateRoute>
        ),
      },
      {
        path: "contests/:id",
        element: (
          <PrivateRoute>
            <ContestDetailsPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "forgot-password", Component: ForgotPassword },
    ],
  },
  {
   path: 'dashboard',
   element : <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
   children: [
    {
      path: 'my-participated-contests',
      Component : UserDashboard
    }
   ]
  },
  { path: "*", Component: PageNotFound },
]);
