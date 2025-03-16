import {FC, JSX} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Trip} from "../../@types/Trip";
import styles from "../../styles/components/TripDashboard.module.css"
import RemoveIcon from '@mui/icons-material/Remove';
import {useFavorites} from "../../contexts/MySelectionContext";

type DashboardProps = {
    trip: Trip
    page: "Overview" | "Reservations" | "Travel History" | "My selection" | "Personal information" | "Settings"
}
const TripDashboard: FC<DashboardProps> = ({trip, page}) => {
    const navigate = useNavigate();
    const {tripId} = useParams<{tripId: string}>();
    const {handleRemoveFromFavorites} = useFavorites();

    return (
        <div className={`${styles.tripDashboardContainer} ${page === "My selection" ? styles.relative : ""}`}>
            <h2 className={styles.tripDashboardTitle}>{trip.name}</h2>
            <hr/>
            {page === "Travel History" && (
                <p>Personnalisé</p> /*TODO : A changer avec le vrai type de la réservation*/
            )}
            {page === "My selection" && (
                <RemoveIcon sx={{position: "absolute", bottom: 150, right: 25}}
                            onClick={() => handleRemoveFromFavorites(trip)}/>
            )}

            <p className={styles.tripDashboardDescription}>{trip.description}</p>
            <p className={styles.tripDashboardDetails} onClick={() => navigate(`/trip/${trip.id}`)}>Details</p>
            {page === "Reservations" && (
                <p>Status : {trip.status}</p> /*TODO : A changer avec le vrai status de la réservation*/
            )}

            {
                page === "Travel History" && (
                    <p>Personnalisé</p>
                )
            }

        </div>
    );
};

export default TripDashboard;
