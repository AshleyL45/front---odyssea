import {FC, JSX, useState} from 'react';
import TripDashboard from "../../../components/ReusableComponents/TripDashboard";
import {Trip} from "../../../@types/Trip";
import styles from "../../../styles/Reservation.module.css"


const Reservation: ({}: {}) => JSX.Element = ({}) => {
    const [activeFilter, setActiveFilter] = useState<string>("");

    //TODO: Requête API pour récupérer toutes les réservations
    // TODO: Filtrer par status en front

    const handleFiltering = (filterName : string) => {
        setActiveFilter(filterName);
        /*if(filterName === "Tout"){

        } else if (filterName === "En attente"){

        } else if (filterName === "Confirmé") {

        } else if (filterName === "Annulé") {

        }*/
    }

    // Fausse donnée
    const trip: Trip = {
        id: 1,
        itineraryName: "Séjour de rêve aux Maldives",
        description: "Venez découvrir les magnifiques îles des Maldives, avec leurs plages de sable blanc, leurs lagons turquoise et leurs complexes hôteliers de luxe. Vous aurez l'occasion de vous détendre, de faire du snorkeling, de plonger avec les tortues et de savourer des plats locaux. Ce voyage vous offrira des moments inoubliables dans l'une des destinations les plus paradisiaques du monde.",
        shortDescription: "Plages de rêve, luxe et plongée aux Maldives.",
        price: 3999.99,
        duration: 21
    }

    return (
        <div className={styles.reservationContainer}>
            <h1>Réservations</h1>
            <h2 className={styles.titles}>En cours</h2>
            <TripDashboard trip={trip} page={"Reservations"}/>
            <div className={styles.filters}>
                <p
                    className={`${styles.filterItem} ${activeFilter === "Tout" ? styles.active : ""}`}
                    onClick={() => handleFiltering("Tout")}
                >
                    Tout
                </p>

                {/*TODO: Ajouter le map*/}
                <p
                    className={`${styles.filterItem} ${activeFilter === "En attente" ? styles.active : ""}`}
                    onClick={() => handleFiltering("En attente")}
                >
                    En attente
                </p>

                {/*TODO: Ajouter le map*/}
                <p
                    className={`${styles.filterItem} ${activeFilter === "Confirmé" ? styles.active : ""}`}
                    onClick={() => handleFiltering("Confirmé")}
                >
                    Confirmé
                </p>

                {/*TODO: Ajouter le map*/}
                <p
                    className={`${styles.filterItem} ${activeFilter === "Annulé" ? styles.active : ""}`}
                    onClick={() => handleFiltering("Annulé")}
                >
                    Annulé
                </p>
                {/*TODO: Ajouter le map*/}
            </div>
        </div>
    );
};

export default Reservation;
