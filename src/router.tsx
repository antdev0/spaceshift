import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import AdminLayout from "@layouts/AdminLayout";
const Login = lazy(() => import("@pages/auth/Login"));
const AgentDashboard = lazy(() => import("@pages/agent/AgentDashboard"));


const Dashboard = lazy(() => import("@pages/admin/Dashboard"));
const ManageAgents = lazy(() => import("@pages/admin/ManageAgents"));
const AgentSchedule = lazy(() => import("@pages/admin/AgentSchedule"));



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
    },


    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "",
                element: <Dashboard />,
            },
            {
                path: "agents",
                element: <ManageAgents />,
            },
            {
                path: "schedules",
                element: <AgentSchedule />,
            },
            {
                path: "reports",
                element: <div>Reports</div>,
            },
            {
                path: "settings",
                element: <div>Settings</div>,
            },
        ],
    }
]);

export default router;
