import Layout from "../components/layout/Layout";
import LandingPage from "../pages/LandingPage";
import HomePage from "../pages/HomePage";
import JobDetailPage from "../pages/JobDetailPage";
import AuthPage from "../pages/AuthPage";
import SignupPage from "../pages/SignupPage";
import AccountPage from "../pages/AccountPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import AdminPage from "../pages/AdminPage";
import EmployerDashboard from "../pages/EmployerDashboard";
import BlogPage from "../pages/BlogPage";
import BlogPostPage from "../pages/BlogPostPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import EmailVerificationPage from "../pages/EmailVerificationPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import { createBrowserRouter } from "react-router";
import NotFoundPage from "../pages/NotFoundPage";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: "jobs",
        element: <HomePage />
      },
      {
        path: "job/:slug",
        element: <JobDetailPage />
      },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        )
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
        path: "contact",
        element: <ContactPage />
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        )
      },
      {
        path: "employer-dashboard",
        element: (
          <ProtectedRoute>
            <EmployerDashboard />
          </ProtectedRoute>
        )
      },
      {
        path: "blog",
        element: <BlogPage />
      },
      {
        path: "blog/:id",
        element: <BlogPostPage />
      },
      {
        path: "email-verification",
        element: <EmailVerificationPage />
      },
      {
        path: "*",
        element: <NotFoundPage />
      }
    ]
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />
  }
])
