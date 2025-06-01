import {JSX, useState} from 'react';
import TripDashboard from "../../../components/ReusableComponents/TripDashboard";
import styles from "../../../styles/Reservation.module.css";
import Pages from "../../../components/layout/Pages"
import {Backdrop, CircularProgress} from "@mui/material";
import {BookingConfirmation} from "../../../@types/BookingConfirmation";
import {useUserDashboard} from "../../../contexts/DashboardContext";
import {useUserBookings} from "../../../hooks/UseUserBookings";


const Reservation: ({}: {}) => JSX.Element = ({}) => {
    const [activeFilter, setActiveFilter] = useState<string>("Tout");
    const [filteredBookings, setFilteredBookings] = useState<BookingConfirmation[]>([]);
    const {userBookings, loading} = useUserDashboard(); // Récupérer les réservations de l'utilisateur


    // Gestion des filtres
    const handleFiltering = (filterName: string) => {
        setActiveFilter(filterName);
        const filtered = filterName === "All"
            ? userBookings
            : userBookings.filter((booking) =>
                booking.status?.toLowerCase() === filterName.toLowerCase()
            );
        setFilteredBookings(filtered);
    }


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
                {userBookings.length > 0 && userBookings ? userBookings.map((booking) => (
                    <TripDashboard booking={booking} page={"Reservations"} status={booking.status} key={booking.id}/>
                )) : (
                    <p style={{marginLeft: "4rem"}}>No current trip.</p>
                )}
                <div className={styles.filters}>
                    <p
                        className={`${styles.filterItem} ${activeFilter === "All" ? styles.active : ""}`}
                        onClick={() => handleFiltering("All")}
                    >
                        All
                    </p>


                    <p
                        className={`${styles.filterItem} ${activeFilter === "Pending" ? styles.active : ""}`}
                        onClick={() => handleFiltering("Pending")}
                    >
                        Pending
                    </p>

                    <p
                        className={`${styles.filterItem} ${activeFilter === "Confirmed" ? styles.active : ""}`}
                        onClick={() => handleFiltering("Confirmed")}
                    >
                        Confirmed
                    </p>

                    <p
                        className={`${styles.filterItem} ${activeFilter === "Cancelled" ? styles.active : ""}`}
                        onClick={() => handleFiltering("Cancelled")}
                    >
                        Cancelled
                    </p>
                </div>

                <div>
                    {
                        filteredBookings && filteredBookings.length > 0 && filteredBookings.map((reservation) =>
                            <TripDashboard key={reservation.id} booking={reservation} page={"Reservations"}/>)
                    }
                </div>
            </div>
            </Pages>
        </>
    );
};

export default Reservation;
