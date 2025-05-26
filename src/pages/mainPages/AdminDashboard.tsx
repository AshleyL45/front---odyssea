import {FC, JSX, useEffect, useState} from 'react';
import BookingCard from "../../components/admin/BookingCard";
import AdminBooking from "../../@types/AdminBooking";
import {fetchAdminBookings} from "../../services/AdminService";

const AdminDashboard: ({}: {}) => JSX.Element = ({}) => {
    const [bookings, setBookings] = useState<AdminBooking[] | null>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookings = await fetchAdminBookings();
                setBookings(bookings?.data);
            } catch (error) {
                console.error("Erreur de chargement des réservations", error);
                setBookings(null);
                setError("An error occurred while loading the bookings.");
            }
        };
        fetchData();
    }, []);


    return (
        <div>
            {error && <p style={{color: "red"}}>{error}</p>}
            <section>
                {
                    bookings ? bookings.map((booking: AdminBooking) => (
                            <BookingCard booking={booking} key={booking.bookingId}/>
                        )) :
                        <p> No bookings are available.</p>
                }
            </section>


        </div>
    );
};

export default AdminDashboard;
