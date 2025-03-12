import {useAuth} from "../contexts/AuthContext";
import {Navigate, Outlet} from "react-router-dom";

export const ProtectedRoutes = () => {
    const {token} = useAuth();

    if (!token) return <Navigate to="/login"/>; // Si aucun token n'existe, aller sur la page de connexion

    return <Outlet/>;
}