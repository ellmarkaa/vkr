import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import {ProtectedRoute} from "../ui/ProtectedRoute";
import {PublicRoute} from "../ui/PublicRoute";
import {Main} from "../pages/Main";
import {Login} from "../pages/Login";
import {Register} from "../pages/Register";
import {Layout} from "../containers/Layout";

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        {/*<Disk />*/}
        <Layout>
          <Main />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        {/*<Profile />*/}
        profile
      </ProtectedRoute>
    ),
  },
  {
    path: '/registration',
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  // Fallback route for unmatched paths (optional, but good practice)
  {
    path: '*',
    element: <Navigate to="/login" replace />, // Default to login if not authenticated, or to '/' if authenticated
  },
];

export const router = createBrowserRouter(routes);
