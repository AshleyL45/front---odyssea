import {createContext, JSX, useContext} from 'react';
import {Trip} from "../@types/Trip";
import {useAuth} from "./AuthContext";
import {useFavorites} from "../hooks/UseFavorites"


interface MySelectionContextProps {
    favorites: Trip[];
    isLoading: boolean;
    isPending: boolean;
    error: string | null;
    addToFavorites: (trip: Trip) => void;
    removeFromFavorites: (tripId: number) => void;
}

interface MySelectionProviderProps {
    children: React.ReactNode;
}

const MySelectionContext = createContext<MySelectionContextProps | null>(null);

export const MySelectionProvider = ({children} : MySelectionProviderProps) => {
    const {token} = useAuth();
    const {
        favorites,
        isLoading,
        isPending,
        error,
        addToFavorites,
        removeFromFavorites
    } = useFavorites(token)



    return (
        <MySelectionContext.Provider
            value={{
                favorites,
                isLoading,
                isPending,
                error,
                addToFavorites,
                removeFromFavorites
            }}
        >
            {children}
        </MySelectionContext.Provider>
    );
};

// Hook personnalisé
export const useMySelectionContext = () => {
    const context = useContext(MySelectionContext);
    if (!context) {
        throw new Error("useFavorites must be used within a MySelectionProvider");
    }
    return context;
};
