import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
const Login = lazy(() => import("@pages/auth/Login"));
const AgentDashboard = lazy(() => import("@pages/agent/AgentDashboard"));



const router = createBrowserRouter([
    {
        path: "*",
        element: <div>Not found</div>,
    },



    {
        path: "/",
        element: <Login />,
    },

    {
        path: "/agent",
        element: <AgentDashboard />,
    }
]);

export default router;
