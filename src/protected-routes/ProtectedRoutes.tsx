import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

export const ProtectedRoutes = ({allowedRoles}: { allowedRoles: string}) => {
    const {token, role} = useAuth();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{from : location}} replace/>;
    }

    if (role && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace/>;
    }

    return <Outlet/>;
};
