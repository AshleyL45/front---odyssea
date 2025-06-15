import {FC, JSX, useEffect, useState} from 'react';
import TripDashboard from "../../../components/ReusableComponents/TripDashboard";
import {Trip} from "../../../@types/Trip";
import styles from "../../../styles/Booking.module.css";
import {get} from "../../../API/api";
import {useAuth} from "../../../contexts/AuthContext";
import Pages from "../../../components/layout/Pages"



const Booking: ({}: {}) => JSX.Element = ({}) => {
    const [activeFilter, setActiveFilter] = useState<string>("Tout");
    const {userId} = useAuth();
    const [userBookings, setUserBookings] = useState<Trip[]>([]);
    const [filteredBookings, setFilteredBookings] = useState<Trip[]>([]);

    console.log(userId)

    // Récupérer les réservations de l'utilisateur
    useEffect(() => {
        const fetchAndFilterBookings = async () => {
            try {
                const bookings = await get(`/bookings/${userId}`);
                setUserBookings(bookings);

                const filtered = activeFilter === "Tout"
                    ? bookings
                    : bookings.filter((booking: Trip) => booking.status === activeFilter);
                setFilteredBookings(filtered);

                // Appel à userItinerary sans bloquer l'affichage
                get(`/userItinerary/all/${userId}`)
                    .then((userItineraries) => {
                        console.log("Fetched user itineraries (optional):", userItineraries);
                    })
                    .catch((e) => {
                        console.warn("Could not load user itineraries (non-blocking):", e.message);
                    });

            } catch (e) {
                console.error("Error while fetching bookings : ", e);
            }
        };
        fetchAndFilterBookings();
    }, [activeFilter]);


    // Gestion des filtres
    const handleFiltering = (filterName: string) => {
        setActiveFilter(filterName);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Avoir la dernière réservation en cours
    const firstOngoingBooking = userBookings.find((booking) => {
        if (!booking.purchaseDate) return false;
        const bookingDate = new Date(booking.purchaseDate.split('-').reverse().join('-'));
        return booking.status === "En attente" && bookingDate < today;
    });

    return (
        <>
            <Pages title="Booking - Odyssea">

            <div className={styles.bookingContainer}>
                <h1>My bookings</h1>
                <h2 className={styles.titles}>Current</h2>
                {userBookings.length > 0 && userBookings ? userBookings.map((booking) => (
                    <TripDashboard trip={booking} page={"Bookings"}/>
                )) : (
                    <p style={{marginLeft: "4rem"}}>No current trip.</p>
                )}
                <div className={styles.filters}>
                    <p
                        className={`${styles.filterItem} ${activeFilter === "Tout" ? styles.active : ""}`}
                        onClick={() => handleFiltering("Tout")}
                    >
                        All
                    </p>


                    <p
                        className={`${styles.filterItem} ${activeFilter === "En attente" ? styles.active : ""}`}
                        onClick={() => handleFiltering("En attente")}
                    >
                        Pending
                    </p>

                    <p
                        className={`${styles.filterItem} ${activeFilter === "Confirmé" ? styles.active : ""}`}
                        onClick={() => handleFiltering("Confirmé")}
                    >
                        Confirmed
                    </p>

                    <p
                        className={`${styles.filterItem} ${activeFilter === "Annulé" ? styles.active : ""}`}
                        onClick={() => handleFiltering("Annulé")}
                    >
                        Annulé
                    </p>
                </div>

                <div>
                    {
                        filteredBookings && filteredBookings.length > 0 && filteredBookings.map((booking) =>
                            <TripDashboard key={booking.id} trip={booking} page={"Bookings"}/>)
                    }
                </div>
            </div>
            </Pages>
        </>
    );
};

export default Booking;
