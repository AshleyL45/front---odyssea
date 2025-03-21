import {createContext, JSX, useContext, useEffect, useMemo, useState} from "react";
import {Trip} from "../@types/Trip";
import {get} from "../API/api";
import {useAuth} from "./AuthContext";

interface DashboardContextProps {
    userReservations: Trip[];
    firstCurrentReservation: Trip | undefined;
    pastTrips: Trip[];
    currentTrips: Trip[];
    lastDoneReservation: Trip | undefined;
}

const DashboardContext = createContext<DashboardContextProps | null>(null);

export const DashboardContextProvider: ({children}: { children: any }) => JSX.Element = ({children}) => {
    const [userReservations, setUserReservations] = useState<Trip[]>([]);
    const {userId} = useAuth();
    const userIdNumber = userId.toString()

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const reservations = await get(`/reservations/${userId}`);
                if (reservations) {
                    setUserReservations(reservations);
                }

                console.log("fetching reservations : " + typeof userIdNumber);
            } catch (e) {
                console.error("Error while fetching reservations: ", e);
            }
        };
        fetchReservations();
    }, [userId]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstCurrentReservation = userReservations.find((reservation) => {
        if (!reservation.purchaseDate) return false;
        const reservationDate = new Date(reservation.purchaseDate.split('-').reverse().join('-'));
        return reservation.status === "En attente" && reservationDate >= today;
    });

    const pastTrips = userReservations.filter((reservation) => {
        if (!reservation.purchaseDate) return false;
        const reservationDate = new Date(reservation.purchaseDate.split('-').reverse().join('-'));
        return reservation.status === "Confirmé" && reservationDate < today;
    });

    const currentTrips = userReservations.filter((reservation) => {
        if (!reservation.purchaseDate) return false;
        const reservationDate = new Date(reservation.purchaseDate.split('-').reverse().join('-'));
        return reservation.status === "En attente" && reservationDate >= today;
    });

    const lastDoneReservation = userReservations.find((reservation) => {
        if (!reservation.purchaseDate) return false;
        const reservationDate = new Date(reservation.purchaseDate.split('-').reverse().join('-'));
        return reservation.status === "Confirmé" && reservationDate < today;
    });

    return (
        <DashboardContext.Provider
            value={{userReservations, firstCurrentReservation, pastTrips, currentTrips, lastDoneReservation}}>
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