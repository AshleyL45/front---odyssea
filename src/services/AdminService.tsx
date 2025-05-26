import {get} from "../API/api";

export const fetchAdminBookings = async () => {
    const data = await get("/admin/bookings");
    if (!data) throw new Error("No bookings found");
    return data;
}