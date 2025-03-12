import {FC, JSX} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Trip} from "../../@types/Trip";
import styles from "../../styles/components/TripDashboard.module.css"
import RemoveIcon from '@mui/icons-material/Remove';

type DashboardProps = {
    trip: Trip
    page: "Overview" | "Reservations" | "Travel History" | "My selection" | "Personal information" | "Settings"
}
const TripDashboard: FC<DashboardProps> = ({trip, page}) => {
    const navigate = useNavigate();
    const {tripId} = useParams<{tripId: string}>()
    return (
        <div className={styles.tripDashboardContainer}>
            <h2 className={styles.tripDashboardTitle}>{trip.itineraryName}</h2>
            <hr/>
            {page === "Travel History" && (
                <p>Personnalisé</p> /*TODO : A changer avec le vrai type de la réservation*/
            )}
            {page === "My selection" && (
                <RemoveIcon/>
            )}

            <p className={styles.tripDashboardDescription}>{trip.description}</p>
            <p className={styles.tripDashboardDetails} onClick={() => navigate(`/trip/${trip.id}`)}>Details</p>
            {page === "Reservations" && (
                <p>Status : Réservé</p> /*TODO : A changer avec le vrai status de la réservation*/
            )}

        </div>
    );
};

export default TripDashboard;
