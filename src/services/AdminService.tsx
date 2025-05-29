import {get} from "../API/api";

export const fetchAdminBookings = async () => {
    const data = await get("/admin/bookings");
    if (!data) throw new Error("No bookings found");
    return data;
}

export const fetchAdminUserItineraries = async () => {
    const data = await get("/admin/userItineraries");
    if (!data) throw new Error("No userItineraries found");
    return data;
}

export const searchUserItineraries = async (value : string) => {
    const data = await get(`/admin/userItineraries?search=${value}`);
    if (!data) throw new Error("No userItineraries found");
    return data;
}

export const searchBookings = async (value: string) => {
    const data = await get(`/admin/bookings?search=${value}`);
    if (!data) throw new Error("No bookings found");
    return data;
}