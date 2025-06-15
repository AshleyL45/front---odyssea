import {createContext, JSX, useContext, useEffect, useMemo, useState} from "react";
import {Trip} from "../@types/Trip";
import {get} from "../API/api";
import {useAuth} from "./AuthContext";
import {useLocation} from "react-router-dom";

interface DashboardContextProps {
    userBookings: Trip[];
    firstCurrentBooking: Trip | undefined;
    pastTrips: Trip[];
    currentTrips: Trip[];
    lastDoneBooking: Trip | undefined;
    personalizedTrips: Trip[];
}

const DashboardContext = createContext<DashboardContextProps | null>(null);

export const DashboardContextProvider: ({children}: { children: any }) => JSX.Element = ({children}) => {
    const [userBookings, setUserBookings] = useState<Trip[]>([]);
    const [personalizedTrips, setPersonalizedTrips] = useState<Trip[]>([]);
    const {userId, token} = useAuth();
    const location = useLocation();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const bookings = await get(`/bookings/${userId}`);
                const userItineraries = await get(`/userItinerary/all/${userId}`);
                if (bookings && userItineraries) {
                    setUserBookings(bookings);
                    setPersonalizedTrips(userItineraries);
                    //console.table(personalizedTrips);
                }
            } catch (e) {
                console.error("Error while fetching bookings: ", e);
            }
        };
        fetchBookings();
    }, [token, location]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstCurrentBooking = userBookings.find((booking) => {
        if (!booking.purchaseDate) return false;
        const bookingDate = new Date(booking.purchaseDate.split('-').reverse().join('-'));
        return booking.status === "En attente" && bookingDate >= today;
    });

    const pastTrips = userBookings.filter((booking) => {
        if (!booking.purchaseDate) return false;
        const bookingDate = new Date(booking.purchaseDate.split('-').reverse().join('-'));
        return booking.status === "Confirmé" && bookingDate < today;
    });

    const currentTrips = userBookings.filter((booking) => {
        if (!booking.purchaseDate) return false;
        const bookingDate = new Date(booking.purchaseDate.split('-').reverse().join('-'));
        return (booking.status === "En attente" || booking.status === "Current") && bookingDate >= today;
    });

    const lastDoneBooking = userBookings.find((booking) => {
        if (!booking.purchaseDate) return false;
        const bookingDate = new Date(booking.purchaseDate.split('-').reverse().join('-'));
        return booking.status === "Confirmé" && bookingDate < today;
    });

    return (
        <DashboardContext.Provider
            value={{userBookings, firstCurrentBooking, pastTrips, currentTrips, lastDoneBooking, personalizedTrips}}>
            {children}
        </DashboardContext.Provider>
    );
};

// Hook personnalisé
export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if(!context) {
        throw new Error("useDashboard must be used within a DashboardProvider");
    }

    return context;
}