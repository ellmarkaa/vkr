import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import {ProtectedRoute} from "../ui/ProtectedRoute";
import {PublicRoute} from "../ui/PublicRoute";

const routes: RouteObject[] = [
    {
        path: '/',
        element: (
            <ProtectedRoute>
                {/*<Disk />*/}
                disk
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
                {/*<Registration />*/}
                registration
            </PublicRoute>
        ),
    },
    {
        path: '/login',
        element: (
            <PublicRoute>
                {/*<Login />*/}
                login
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