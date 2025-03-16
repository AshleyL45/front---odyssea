import {FC, JSX, useEffect, useState} from 'react';
import TripDashboard from "../../../components/ReusableComponents/TripDashboard";
import {Trip} from "../../../@types/Trip";
import styles from "../../../styles/Reservation.module.css"
import {get} from "../../../API/api";
import {useAuth} from "../../../contexts/AuthContext";


const Reservation: ({}: {}) => JSX.Element = ({}) => {
    const [activeFilter, setActiveFilter] = useState<string>("Tout");
    const {userId} = useAuth();
    const [userReservations, setUserReservations] = useState<Trip[]>([]);
    const [filteredReservations, setFilteredReservations] = useState<Trip[]>([]);

    // Récupérer les réservations de l'utilisateur
    useEffect(() => {
        const fetchAndFilterReservations = async () => {
            try{
                const reservations = await get(`/reservations/${userId}`);
                //console.log("Reservations : ", JSON.stringify(reservations));

                if(reservations){
                    setUserReservations(reservations);
                    const filtered = activeFilter === "Tout" ? reservations : reservations.filter((reservation : Trip) => reservation.status === activeFilter);
                    setFilteredReservations(filtered);
                }
            } catch (e) {
                console.error("Error while fetching reservations : ", e);
            }
        }
        fetchAndFilterReservations();
    }, [activeFilter]);

    // Gestion des filtres
    const handleFiltering = (filterName : string) => {
        setActiveFilter(filterName);
    }


    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Avoir la dernière réservation en cours
    const firstOngoingReservation = userReservations.find((reservation) => {
        if (!reservation.purchaseDate) return false;
        const reservationDate = new Date(reservation.purchaseDate.split('-').reverse().join('-'));
        return reservation.status === "En attente" && reservationDate < today;
    });


    return (
        <div className={styles.reservationContainer}>
            <h1>Réservations</h1>
            <h2 className={styles.titles}>En cours</h2>
            {firstOngoingReservation ? (
                <TripDashboard trip={firstOngoingReservation} page={"Reservations"}/>
            ) : (
                <p>Aucune réservation en cours.</p>
            )}
            <div className={styles.filters}>
                <p
                    className={`${styles.filterItem} ${activeFilter === "Tout" ? styles.active : ""}`}
                    onClick={() => handleFiltering("Tout")}
                >
                    Tout
                </p>


                <p
                    className={`${styles.filterItem} ${activeFilter === "En attente" ? styles.active : ""}`}
                    onClick={() => handleFiltering("En attente")}
                >
                    En attente
                </p>

                <p
                    className={`${styles.filterItem} ${activeFilter === "Confirmé" ? styles.active : ""}`}
                    onClick={() => handleFiltering("Confirmé")}
                >
                    Confirmé
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
                    filteredReservations && filteredReservations.length > 0 && filteredReservations.map((reservation) =>
                        <TripDashboard key={reservation.id} trip={reservation} page={"Reservations"}/>)
                }
            </div>
        </div>
    );
};

export default Reservation;
