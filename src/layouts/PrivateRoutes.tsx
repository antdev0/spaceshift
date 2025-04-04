import { Navigate } from "react-router-dom";
import { useAuthContext } from "@hooks/contexts/useAuthContext";
import { ReactNode } from "react";

interface PrivateRouteProps {
    allowedRoles: ("admin" | "agent" | "tl")[];
    children?: ReactNode;
}

const PrivateRoutes = ({ allowedRoles, children }: PrivateRouteProps) => {
    const { isAuthenticated, user, loading } = useAuthContext();

    if (loading) return <p>Loading...</p>;

    if (!isAuthenticated) return <Navigate to="/" replace />;

    if (user && !allowedRoles.includes(user.system_role)) {
        return <Navigate to="/403" replace />;
    }

    return <>{children}</>;
};

export default PrivateRoutes;
