import {useAuth} from "../contexts/AuthContext";
import {Navigate, Outlet, useLocation} from "react-router-dom";

export const ProtectedRoutes = () => {
    const {token} = useAuth();
    const location = useLocation();

    if (!token) return <Navigate to="/login" state={{from: location}} replace/>; // Si aucun token n'existe, aller sur la page de connexion

    return <Outlet/>;
}