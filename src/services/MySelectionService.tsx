import {get, post, deleteFromDB} from "../API/api";
import {Trip} from "../@types/Trip";

export const fetchFavorites = async () => {
    return await get("/mySelection/");
};

export const addToFavorites = async (trip: Trip) => {
    return await post(`/mySelection/add/${trip.id}`, {});
};

export const removeFromFavorites = async (tripId: number) => {
    return await deleteFromDB(`/mySelection/remove/${tripId}`);
};

export const getFavoritesFromLocalStorage = (): Trip[] => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
};

export const setFavoritesToLocalStorage = (favorites: Trip[]) => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
};
