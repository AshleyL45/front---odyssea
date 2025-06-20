import {useEffect, useState} from "react";
import AdminBooking from "../@types/AdminBooking";
import {fetchAdminBookings, fetchAdminUserItineraries} from "../services/AdminService";

type BookingType = "Standard" | "Personalized";

interface Filters {
    search?: string;
    status?: string;
    sortField?: string;
    sortDirection?: "asc" | "desc";
}
export const useAdminDashboard = (
    value : string | null,
    statusFilter : string | null,
    activeItem: BookingType,
    sortField?: string | null,
    sortDirection?: "asc" | "desc" | null
) => {
    const [bookings, setBookings] = useState<AdminBooking[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const filters: Filters = {
                    search: value || undefined,
                    status: statusFilter || undefined,
                    sortField: sortField || undefined,
                    sortDirection: sortDirection || undefined,
                };

                await new Promise(resolve => setTimeout(resolve, 1000));

                let result;
                if (activeItem === "Standard") {
                    result = await fetchAdminBookings(filters);
                } else {
                    result = await fetchAdminUserItineraries(filters);
                }

                setBookings(result.data);
                setError(null);
            } catch (e) {
                console.error("Erreur de chargement des réservations", e);
                setBookings(null);
                setError("An error occurred while loading the bookings.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [activeItem, value, statusFilter, sortField, sortDirection])

    return {bookings, error, loading};
}