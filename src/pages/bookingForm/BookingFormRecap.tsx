import {FC, JSX} from 'react';
import styles from "../../styles/components/TripDashboard.module.css";
import RemoveIcon from "@mui/icons-material/Remove";
import {useReservation} from "../../contexts/ReservationContext";


const BookingFormRecap: ({}: {}) => JSX.Element = ({}) => {
    const {questionnairesAnswers} = useReservation();

    // Avoir un trip en props

    return (
        <div>
            <h1 style={{fontSize: "25px", margin: "10px 0"}}>Summary of your trip</h1>
            <div style={{width: 2, height: 10, backgroundColor: "black"}}></div>

            <div className={styles.tripTitle}>
                <h2 className={styles.tripDashboardTitle}></h2>
            </div>

        </div>
    );
};

export default BookingFormRecap;
