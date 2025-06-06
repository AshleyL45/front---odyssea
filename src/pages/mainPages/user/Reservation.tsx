import {JSX, useMemo, useState} from 'react';
import TripDashboard from "../../../components/ReusableComponents/TripDashboard";
import styles from "../../../styles/Reservation.module.css";
import Pages from "../../../components/layout/Pages"
import {Backdrop, CircularProgress} from "@mui/material";
import {useUserDashboard} from "../../../contexts/DashboardContext";
import BookingFilters from "../../../components/dashboard/BookingFilters";


const Reservation: ({}: {}) => JSX.Element = ({}) => {
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const {userBookings, loading} = useUserDashboard(); // Récupérer les réservations de l'utilisateur


    // Gestion des filtres
    const filteredBookings = useMemo(() => {
        if (activeFilter === "All") return userBookings;
        return userBookings.filter(
            (booking) =>
                booking.status?.toLowerCase() === activeFilter.toLowerCase()
        );
    }, [activeFilter, userBookings]);

    const filters = ["All", "Pending", "Confirmed", "Cancelled"];


    return (
        <>
            <Pages title="Reservation - Odyssea">
                {
                    loading && <Backdrop
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            color: '#fff',
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                        open={loading}
                    >
                        <CircularProgress color="inherit"/>
                    </Backdrop>
                }


                <div className={styles.reservationContainer}>
                    <h1>My bookings</h1>

                    <BookingFilters
                        filters={filters}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                    />

                    <section aria-live="polite" className={styles.filteredBookings}>
                        {filteredBookings.length > 0 ? (
                            filteredBookings.map((reservation) => (
                                <TripDashboard
                                    key={reservation.id}
                                    booking={reservation}
                                    page={"Reservations"}
                                    status={reservation.status}
                                />
                            ))
                        ) : (
                            <p>No bookings found for this filter.</p>
                        )}
                    </section>
                </div>
            </Pages>
        </>
    );
};

export default Reservation;
