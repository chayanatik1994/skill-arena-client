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

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
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
  { path: "*", Component: PageNotFound },
]);
