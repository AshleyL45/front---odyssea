import React, {createContext, FC, useContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {useLocation, useNavigate} from "react-router-dom";

interface AuthContext {
    userId: number;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    login: (token: string) => void;
    logout: () => void;
    decodeToken: () => void;
    token: string | null;
    role: string | null;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider: FC<{ children: React.ReactNode }> = ({children}) => {

    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [userId, setUserId] = useState<number>(0);
    const [email, setEmail] = useState<string | null>(null);
    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            decodeToken();
            const currentTime = Date.now() / 1000;

            if (currentTime > 0) {
                const logoutTimer = setTimeout(() => {
                    logout();
                }, currentTime);

                return () => clearTimeout(logoutTimer);
            }
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
        setUserId(0);
        setFirstName(null);
        setLastName(null);
        setEmail(null)
        setRole(null);

        navigate('/', {replace: true});
    }

    const decodeToken = () => {
        if (token) {
            try {
                // Récupérer l'id de l'utilisateur depuis le token
                const decoded: any = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if(decoded.exp < currentTime){
                    logout()
                } else {
                    setUserId(decoded.id);
                    setFirstName(decoded.firstName);
                    setLastName(decoded.lastName);
                    setEmail(decoded.sub);
                    setRole(decoded.role);
                }

            } catch (error) {
                console.error("Error decoding token:", error);
                logout()
            }
        }
    }



    return (
        <AuthContext.Provider value={{userId, firstName, lastName, email, token, login, logout, decodeToken, role}}>
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



