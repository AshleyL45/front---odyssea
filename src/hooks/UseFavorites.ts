import {useEffect, useState, useTransition} from "react";
import {Trip} from "../@types/Trip";
import {
    fetchFavorites,
    addToFavorites as apiAddToFavorites,
    removeFromFavorites as apiRemoveFromFavorites,
    getFavoritesFromLocalStorage,
    setFavoritesToLocalStorage
} from "../services/MySelectionService";

export const useFavorites = (token: string | null) => {
    const [favorites, setFavorites] = useState<Trip[]>(getFavoritesFromLocalStorage());
    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    // Synchronisation avec l’API quand le token est disponible
    useEffect(() => {
        if (!token) return;

        const sync = async () => {
            setIsLoading(true);
            try {
                const serverFavorites = await fetchFavorites();
                setFavorites(serverFavorites.data);
                setFavoritesToLocalStorage(serverFavorites.data);
            } catch (e) {
                console.error("Erreur lors de la récupération des favoris", e);
                setError("Erreur de chargement des favoris");
            } finally {
                setIsLoading(false);
            }
        };

        sync();
    }, [token]);

    const addToFavorites = async (trip: Trip) => {
        startTransition(() => {
            setFavorites(prev => [...prev, trip]);
        });

        try {
            await apiAddToFavorites(trip);
            setFavoritesToLocalStorage([...favorites, trip]);
        } catch (e) {
            console.error("Erreur ajout favori :", e);
            setError("Impossible d'ajouter ce favori");
        }
    };

    const removeFromFavorites = async (tripId: number) => {
        startTransition(() => {
            setFavorites(prev => prev.filter(t => t.id !== tripId));
        });

        try {
            await apiRemoveFromFavorites(tripId);
            setFavoritesToLocalStorage(favorites.filter(t => t.id !== tripId));
        } catch (e) {
            console.error("Erreur suppression favori :", e);
            setError("Impossible de retirer ce favori");
        }
    };

    return {
        favorites,
        isLoading,
        isPending,
        error,
        addToFavorites,
        removeFromFavorites,
    };
};
