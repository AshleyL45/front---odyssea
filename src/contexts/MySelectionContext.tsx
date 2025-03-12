import {createContext, FC, JSX, startTransition, useContext, useEffect, useOptimistic, useState} from 'react';
import {Trip} from "../@types/Trip";
import {get, post} from "../API/api";

interface MySelectionProps {
    favorites: Trip[];
    handleAddToFavorites: (trip: Trip) => void;
    handleRemoveFromFavorites: (trip: Trip) => void;
}

const MySelectionContext = createContext<MySelectionProps | null>(null);

const getFavoritesFromLocalStorage = ():Trip[] => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
}

export const MySelectionProvider: ({children}: { children: any }) => JSX.Element = ({children}) => {
    const [favorites, setFavorites] = useState<Trip[]>(getFavoritesFromLocalStorage());

    // Mise à jour de l'UI optimiste, documentation sur useOptimistic : https://react.dev/reference/react/useOptimistic
    const [optimisticFavorites, setOptimisticFavorites] = useOptimistic(favorites,
        (currentFavorites, action : any) => {
        if(action.type === "add"){
            return[...currentFavorites, action.payload]
        } else if(action.type === "delete"){
            return currentFavorites.filter((item) => item.id === action.payload.id)
        }
        return currentFavorites;
    })

    // Synchroniser les favoris de la BDD avec le localStorage
    useEffect(() => {
        const syncFavoritesWithDB = async () => {
            try {
                const serverFavorites = await get("/api/get-favorites"); //TODO à modifier avec le bon endpoint

                if (JSON.stringify(serverFavorites) !== JSON.stringify(favorites)) {
                    setFavorites(serverFavorites);
                    localStorage.setItem("favorites", JSON.stringify(serverFavorites));
                }
            } catch (error) {
                console.error("Erreur de synchronisation des favoris :", error);
            }
        };

        syncFavoritesWithDB();
    }, []);

    const handleAddToFavorites = async (trip: Trip) => {
        startTransition(() => {
            setOptimisticFavorites({type: "add", payload: trip}) // Met à jour l'UI
        });
        try {
            await post("/trip/add", trip); // TODO à modifier avec le bon endpoint

            setFavorites((prevFavorites) => [...prevFavorites, trip]);
            localStorage.setItem("favorites", JSON.stringify([...favorites, trip]));
        } catch (e) {
            console.error("Failed to add to favorites : ", e);
        }
    }

    const handleRemoveFromFavorites = async (trip : Trip) => {
        startTransition(() => {
            setOptimisticFavorites({type: "delete", payload: trip})  // Met à jour l'UI
        })

        try {
            await post("/trip/remove", trip); // TODO à modifier avec le bon endpoint
            setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== trip.id));
            localStorage.setItem(
                "favorites",
                JSON.stringify(favorites.filter((item) => item.id !== trip.id))
            );
        } catch (e) {
            console.error("Failed to delete from favorites : ", e);
        }
    }




    return (
        <MySelectionContext.Provider value={{ favorites: optimisticFavorites, handleAddToFavorites, handleRemoveFromFavorites,}}>
            {children}
        </MySelectionContext.Provider>
    );
};

// Hook personnalisé
export const useFavorites = () => {
    const context = useContext(MySelectionContext);
    if (!context) {
        throw new Error("useFavorites must be used within a MySelectionProvider");
    }
    return context;
};
