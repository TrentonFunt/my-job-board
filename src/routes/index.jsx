import Layout from "../components/layout/Layout";
import HomePage from "../pages/HomePage";
import JobDetailPage from "../pages/JobDetailPage";
import AuthPage from "../pages/AuthPage";
import SignupPage from "../pages/SignupPage";
import AccountPage from "../pages/AccountPage";
import AboutPage from "../pages/AboutPage";
import AdminPage from "../pages/AdminPage";
import { createBrowserRouter } from "react-router";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "job/:slug",
        element: <JobDetailPage />
      },
      {
        path: "account",
        element: <AccountPage />
      },
      {
        path: "signup",
        element: <SignupPage />
      },
      {
        path: "auth",
        element: <AuthPage />
      },
      {
        path: "about",
        element: <AboutPage />
      },
      {
        path: "admin",
        element: <AdminPage />
      }
    ]
  }
])
