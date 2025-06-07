import {createContext, JSX, useContext, useEffect, useMemo, useState} from "react";
import {Trip} from "../@types/Trip";
import {get} from "../API/api";
import {useAuth} from "./AuthContext";
import {useLocation} from "react-router-dom";
import {BookingConfirmation} from "../@types/BookingConfirmation";
import {PersonalizedTripResponse} from "../@types/PersonalizeTrip";
import {useUserBookings} from "../hooks/UseUserBookings";
import {useUsernames} from "../hooks/UseUsernames";

interface DashboardContextProps {
    userBookings: BookingConfirmation[];
    firstCurrentBooking: BookingConfirmation | undefined;
    pastTrips: BookingConfirmation[];
    currentTrips: BookingConfirmation[];
    lastDoneBooking: BookingConfirmation | undefined;
    personalizedTrips: PersonalizedTripResponse[];
    loading: boolean;
    firstName: string | null;
    lastName: string | null;
}

interface DashboardProviderProps {
    children: React.ReactNode;
}


const DashboardContext = createContext<DashboardContextProps | null>(null);

export const DashboardContextProvider = ({children} : DashboardProviderProps) => {
    const {token} = useAuth(); // Récupération du token utilisateur
    const {userBookings, personalizedTrips, loading} = useUserBookings(token); // Hook personnalisé qui fetch les données
    const {firstName, lastName} = useUsernames()

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isBeforeToday = (date: Date): boolean => {
        return date < today;
    };

    const isAfterOrToday = (date: Date): boolean => {
        return date >= today;
    };

    // Première réservation future en attente
    const firstCurrentBooking = useMemo(() => {
        return userBookings.find((booking: BookingConfirmation) => {
            if (!booking.departureDate) return false;
            return booking.status === "PENDING" && isAfterOrToday(booking.departureDate);
        });
    }, [userBookings]);

    // Voyages déjà effectués (confirmés dans le passé)
    const pastTrips = useMemo(() => {
        return userBookings.filter((reservation : BookingConfirmation) => {
            if (!reservation.returnDate) return false;
            return reservation.status === "CONFIRMED" && isBeforeToday(new Date(reservation.returnDate));
        });
    }, [userBookings]);

    // Voyages à venir en attente
    const currentTrips = useMemo(() => {
        return userBookings.filter((reservation : BookingConfirmation) => {
            if (!reservation.purchaseDate) return false;
            return reservation.status === "PENDING" && isAfterOrToday(reservation.purchaseDate);
        });
    }, [userBookings]);

    // Dernière réservation effectuée
    const lastDoneBooking = useMemo(() => {
        return userBookings.find((reservation : BookingConfirmation) => {
            if (!reservation.returnDate) return false;
            return reservation.status === "CONFIRMED" && isBeforeToday(reservation.returnDate);
        });
    }, [userBookings]);


    return (
        <DashboardContext.Provider
            value={{userBookings, firstCurrentBooking, pastTrips, currentTrips, lastDoneBooking, personalizedTrips, loading, firstName, lastName}}>
            {children}
        </DashboardContext.Provider>
    );
};

// Hook personnalisé
export const useUserDashboard = () => {
    const context = useContext(DashboardContext);
    if(!context) {
        throw new Error("useDashboard must be used within a DashboardProvider");
    }

    return context;
}