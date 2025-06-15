import {FC, JSX} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Trip} from "../../@types/Trip";
import styles from "../../styles/components/TripDashboard.module.css"
import RemoveIcon from '@mui/icons-material/Remove';
import {useFavorites} from "../../contexts/MySelectionContext";

type DashboardProps = {
    trip: Trip
    page: "Overview" | "Bookings" | "Travel History" | "My selection" | "Personal information" | "Settings"
    type?: "Tailor made" | "Pre-designed trip"
}
const TripDashboard: FC<DashboardProps> = ({trip, page, type}) => {
    const navigate = useNavigate();
    const {tripId} = useParams<{tripId: string}>();
    const {handleRemoveFromFavorites} = useFavorites();

    return (
        <div className={`${styles.tripDashboardContainer} ${page === "My selection"}`}>
            <div  className={styles.tripTitle}>
                <h2 className={styles.tripDashboardTitle}>{trip.name}</h2>
                {page === "My selection" && (
                    <RemoveIcon sx={{bottom: 150, right: 25}}
                                onClick={() => handleRemoveFromFavorites(trip)}/>
                )}
            </div>

            <hr/>


            <p className={styles.tripDashboardDescription}>{trip.description}</p>
            <p className={styles.tripDashboardDetails} onClick={() => navigate(`/trip/${trip.id}`)}>Details</p>
            {page === "Bookings" && (
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem"}}>
                    <p>Status : {trip.status}</p>
                    <p>Price: {trip.price} €</p>
                </div>

            )}

            {
            page === "Travel History" && (
                    <p>{type}</p>
                )
            }

        </div>
    );
};

export default TripDashboard;
