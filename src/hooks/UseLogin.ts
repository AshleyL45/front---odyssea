import {useState} from "react";
import {loginUser} from "../services/AuthService";
import {useAuth} from "../contexts/AuthContext";

export const useLogin = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();

    const logUser = async (email: string, password: string) => {
        try {
            setError("");
            setLoading(true);
            const response = await loginUser(email, password);

            if (response.status === 200) {
                login(response.data.token);
                return true;
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

    return {logUser, error, loading};
};
