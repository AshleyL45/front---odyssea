import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

export const ProtectedRoutes = ({allowedRoles}: { allowedRoles: string}) => {
    const {token, role} = useAuth();

    if (!token) {
        return <Navigate to="/login" replace/>;
    }

    if (role && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace/>;
    }

    return <Outlet/>;
};
