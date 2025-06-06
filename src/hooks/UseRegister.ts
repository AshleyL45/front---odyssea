// src/hooks/useRegister.ts
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {registerUser, RegisterPayload} from "../services/AuthService";

export const useRegister = () => {
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const register = async (data: RegisterPayload) => {
        try {
            const response = await registerUser(data);

            if (response.success === true) {
                navigate("/login");
            } else {
                setError(response.message || "An error occurred during registration.");
            }
        } catch (e) {
            setError("An error occurred while connecting to the server.");
        }
    };

    return {
        register,
        error,
        setError,
    };
};
