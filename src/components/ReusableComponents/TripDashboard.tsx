import {FC, JSX} from 'react';
import {useNavigate} from "react-router-dom";
import {Trip} from "../../@types/Trip";
import styles from "../../styles/components/TripDashboard.module.css"
import RemoveIcon from '@mui/icons-material/Remove';
import {useMySelectionContext} from "../../contexts/MySelectionContext";
import {BookingConfirmation} from "../../@types/BookingConfirmation";

type DashboardProps = {
    booking?: BookingConfirmation
    trip?: Trip
    page: "Overview" | "My Bookings" | "Travel History" | "My selection" | "Personal information" | "Settings"
    type?: "Personalized" | "Pre-designed trip"
    status?: "CANCELLED" | "PENDING" | "CONFIRMED"
}
const TripDashboard: FC<DashboardProps> = ({trip, booking, page, type, status}) => {
    const navigate = useNavigate();
    const {removeFromFavorites} = useMySelectionContext();

    return (
        <div className={`${styles.tripDashboardContainer} ${page === "My selection" ? styles.selectionPage : ""}`}>
            <div className={styles.tripTitle}>
                {(trip || booking) && (
                    <h2 className={styles.tripDashboardTitle}>
                        {trip?.name || booking?.itinerary?.name}
                    </h2>
                )}

                {page === "My selection" && trip?.id && (
                    <RemoveIcon
                        sx={{ bottom: 150, right: 25 }}
                        onClick={() => removeFromFavorites(trip.id)}
                    />
                )}
            </div>

            <hr />

            {(trip || booking) && (
                <p>
                    {trip?.description || booking?.itinerary?.description}
                </p>
            )}

            {booking && (
                <p
                    className={styles.tripDashboardDetails}
                    onClick={() => navigate(`/trip/${booking.id}`)}
                >
                    Details
                </p>
            )}

            {page === "My Bookings" && booking && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "1rem"
                    }}
                >
                    <p>Status: {status}</p>
                    <p>Price: {booking.price} €</p>
                </div>
            )}

            {page === "Travel History" && type && (
                <p style={{ fontWeight: 600 }}>{type}</p>
            )}
        </div>
    );

};

export default TripDashboard;
