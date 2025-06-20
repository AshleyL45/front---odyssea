import {useEffect, useState} from "react";
import {get} from "../API/api";
import {BookingConfirmation} from "../@types/BookingConfirmation";
import {PersonalizedTripResponse} from "../@types/PersonalizeTrip";

export const useUserBookings = (token: string | null) => {
    const [userBookings, setUserBookings] = useState<BookingConfirmation[]>([]);
    const [personalizedTrips, setPersonalizedTrips] = useState<PersonalizedTripResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) {
            return;
        }
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const reservations = await get(`/bookings/`);
                const userItineraries = await get(`/userItinerary/all`);
                if (reservations.data && userItineraries.data) {
                    const parsedReservations = reservations.data.map((r: any) => ({
                        ...r,
                        departureDate: new Date(r.departureDate),
                        returnDate: new Date(r.returnDate),
                        purchaseDate: new Date(r.purchaseDate),
                    }));
                    setUserBookings(parsedReservations);
                    setPersonalizedTrips(userItineraries.data || []);
                }
            } catch (e) {
                console.error("Error while fetching reservations: ", e);
                setError("An error occurred while loading your bookings.");
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [token]);

    return {userBookings, personalizedTrips, loading, error};
}