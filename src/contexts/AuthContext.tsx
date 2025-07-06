import React, {createContext, FC, useContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {useLocation, useNavigate} from "react-router-dom";

interface AuthContext {
    userId: number;
    decodeToken: (token: string) => void;
    login: (token: string) => void;
    logout: () => void;
    token: string | null;
    role: string | null;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider: FC<{ children: React.ReactNode }> = ({children}) => {

    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [userId, setUserId] = useState<number>(0);
    const [role, setRole] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if(storedToken){
            decodeToken(storedToken);
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setToken(token);
        decodeToken(token)
    }

    const logout = () => {
        localStorage.clear()
        setToken(null);
        setUserId(0);
        setRole(null);
        navigate('/', {replace: true});
    }

    const decodeToken = (token : string) => {
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                setUserId(decoded.id);
                setRole(decoded.role);
            } catch (error) {
                console.error("Error decoding token:", error);
                logout()
            }
        }
    }


    return (
        <AuthContext.Provider value={{userId,decodeToken, token, login, logout, role}}>
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



