import {get} from "../API/api";

export const fetchAdminBookings = async (filters?: {
    search?: string;
    status?: string;
    sortField?: string;
    sortDirection?: "asc" | "desc";
}) => {
    const params = new URLSearchParams();

    if (filters?.search) params.append("search", filters.search);
    if (filters?.status) params.append("status", filters.status);
    if (filters?.sortField) params.append("sortField", filters.sortField);
    if (filters?.sortDirection) params.append("sortDirection", filters.sortDirection);


    const queryString = params.toString();
    const url = `/admin/bookings${queryString ? "?" + queryString : ""}`;
    const data = await get(url);

    console.log("Booking " + url);
    if (!data) throw new Error("No bookings found");
    return data;
}

export const fetchAdminUserItineraries = async (filters?: {
    search?: string;
    status?: string;
    sortField?: string;
    sortDirection?: "asc" | "desc";
}) => {
    const params = new URLSearchParams();

    if (filters?.search) params.append("search", filters.search);
    if (filters?.status) params.append("status", filters.status);
    if (filters?.sortField) params.append("sortField", filters.sortField);
    if (filters?.sortDirection) params.append("sortDirection", filters.sortDirection);

    const queryString = params.toString();
    const url = `/admin/userItineraries${queryString ? "?" + queryString : ""}`;
    const data = await get(url);

    console.log("User itinerary " + url);

    if (!data) throw new Error("No userItineraries found");
    return data;
}

export const fetchBookingDetails = async (id : number) => {
    const data = await get(`/admin/bookings/${id}`);
    if (!data) throw new Error(`Booking with id ${id} found`);
    return data;
}

export const fetchUserItineraryDetails = async (id: number) => {
    const data = await get(`/admin/userItineraries/${id}`);
    if (!data) throw new Error("No userItinerary found");
    return data;
}