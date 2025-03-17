import React, {createContext, useContext, useState, useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

// Interface du contexte
interface AuthContextProps {
    userId: string | null;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

// Création du contexte
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [userId, setUserId] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                setUserId(decoded.id);

                if (decoded.exp < Date.now() / 1000) {
                    logout();
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                logout();
            }
        }
    }, [token]);

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUserId(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{userId, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
