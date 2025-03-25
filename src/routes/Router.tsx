import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "../components/auth/PrivateRoute";

const route = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/dashboard" replace/>,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
    },
    {
      path: '*',
    }

]);

export default route;