import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/notFound/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedAuthRoutes from "./ProtectedAuthRoutes";
import PostDetails from "../pages/postDetails/PostDetails";
import { lazy, Suspense } from "react";

const Posts = lazy(() => import("../pages/posts/Posts"));
const Profile = lazy(() => import("../pages/auth/Profile"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Posts />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/posts",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Posts />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/posts/details/:id",
        element: (
          <ProtectedRoutes>
            <PostDetails />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectedAuthRoutes>
            <Login />
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectedAuthRoutes>
            <Register />
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
