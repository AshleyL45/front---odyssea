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
                const bookings = await get(`/bookings/`);
                const userItineraries = await get(`/userItinerary/all`);
                if (bookings.data && userItineraries.data) {
                    const parsedReservations = bookings.data.map((booking: any) => ({
                        ...booking,
                        departureDate: new Date(booking.departureDate),
                        returnDate: new Date(booking.returnDate),
                        purchaseDate: new Date(booking.purchaseDate),
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