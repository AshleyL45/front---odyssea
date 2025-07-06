import {useState} from "react";
import {loginUser} from "../services/AuthService";
import {useAuth} from "../contexts/AuthContext";
import {useLocation, useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export const useLogin = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const logUser = async (email: string, password: string) => {
        try {
            setError("");
            setLoading(true);
            const response = await loginUser(email, password);

            if (response.status === 200) {
                login(response.data.token);

                const decoded: any = jwtDecode(response.data.token);
                const role = decoded.role;

                const redirectTo = isAccessible(from, role) ? from : fallbackRouteFor(role);
                navigate(redirectTo, { replace: true });
            }

        } catch (e: any) {
            console.error("Login error", e);
            const status = e.data.status;

            if (status === 400 || status === 404 || status === 401) {
                setError("Invalid password or username. Please try again.");
            } else {
                setError("An internal error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }

    }

    const isAccessible = (pathname: string, role: string | null): boolean => {
        if (pathname.startsWith("/admin")) return role === "ADMIN";
        if (pathname.startsWith("/dashboard")) return role === "USER";
        return true;
    };

    const fallbackRouteFor = (role: string | null): string => {
        if (role === "ADMIN") return "/admin";
        if (role === "USER") return "/dashboard";
        return "/";
    };


    return {logUser, error, loading};
};