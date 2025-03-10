import React, {createContext, FC, useContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";

interface AuthContext {
    userId: string | null;
    login: (token: string) => void;
    logout: () => void;
    decodeToken: () => void;
    token: string | null;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider: FC<{ children: React.ReactNode }> = ({children}) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [userId, setUserId] = useState<string | null>(null);


    useEffect(() => {
        if (token) {
            decodeToken();
        }
    }, [token]);

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setToken(token);
        decodeToken()
    }

    const logout = () => {
        localStorage.clear()
        setToken(null);
    }

    const decodeToken = () => {
        if (token) {
            try { // Récupérer l'id de l'utilisateur depuis le token
                const decoded: any = jwtDecode(token);
                setUserId(decoded.id);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }

    return (
        <AuthContext.Provider value={{userId, token, login, logout, decodeToken}}>
            {children}
        </AuthContext.Provider>
    )
}

// Hook personnalisé
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("AuthContext is undefined");
    }

    return context;
};



