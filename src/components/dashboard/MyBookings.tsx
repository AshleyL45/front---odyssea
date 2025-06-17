import {JSX, useMemo, useState} from 'react';
import TripDashboard from "../ReusableComponents/TripDashboard";
import styles from "../../styles/Reservation.module.css";
import Pages from "../layout/Pages"
import {Backdrop, CircularProgress} from "@mui/material";
import {useUserDashboard} from "../../contexts/DashboardContext";
import BookingFilters from "./BookingFilters";


const MyBookings: ({}: {}) => JSX.Element = ({}) => {
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const {userBookings, loading, error} = useUserDashboard(); // Récupérer les réservations de l'utilisateur


    // Gestion des filtres
    const filteredBookings = activeFilter === "All"
        ? userBookings
        : userBookings.filter(
            (booking) =>
                booking.status?.toLowerCase() === activeFilter.toLowerCase()
        );

    const filters = ["All", "Pending", "Confirmed", "Cancelled"];


    return (
        <>
            <Pages title="MyBookings - Odyssea">
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


                <h1 className={styles.myBookingsTitle}>My bookings</h1>

                <BookingFilters
                    filters={filters}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                />

                {
                    error ? <p style={{color: "red", marginLeft: "3rem"}}>An error occurred while fetching your bookings</p> : (
                        <section aria-live="polite" className={styles.filteredBookings}>
                            {filteredBookings.length > 0 ? (
                                filteredBookings.map((booking) => (
                                    <TripDashboard
                                        key={booking.id}
                                        booking={booking}
                                        page={"My Bookings"}
                                        status={booking.status}
                                    />
                                ))
                            ) : (
                                <p>No bookings found for this filter.</p>
                            )}
                        </section>
                    )
                }

            </Pages>
        </>
    );
};

export default MyBookings;
