import {useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {loginUser} from "../services/AuthService";
import {useAuth} from "../contexts/AuthContext";

export const useLogin = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const logUser = async (email: string, password: string) => {
        try {
            setError("");
            setLoading(true);
            const response = await loginUser(email, password);

            if (response.status === 200) {
                login(response.data.token);
                const from = location.state?.from || '/';
                navigate(from, {replace: true});
            } else if (response.status === 404) {
                setError("Invalid password or username. Please try again.");
            }

        } catch (e) {
            console.error("Login error", e);
            setError("An internal error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return {logUser, error, loading};
};
