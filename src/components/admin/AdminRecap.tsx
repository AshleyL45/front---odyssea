import {JSX} from 'react';
import {AdminBookingDetails} from "../../@types/AdminBookingDetails";
import styles from "./AdminRecap.module.css"

interface AdminRecapProps {
    booking : AdminBookingDetails;
}

const AdminRecap = ({booking}: AdminRecapProps): JSX.Element => {
    return (
        <div className={styles.container}>
            <h2>{booking.itineraryName}</h2>
            <div className={styles.informationContainer}>
                <div className={styles.recapInformation}>
                    <div className={styles.informationD}>
                        <p>Purchase :</p>
                        <p>{booking.reservation.purchaseDate}</p>
                    </div>

                    <div className={styles.information}>
                        <div className={styles.informationD}>
                            <p>Status :</p>
                            <p> {booking.reservation.status}</p>
                        </div>
                        <button >Edit</button>
                    </div>

                    <div className={styles.information}>
                        <div className={styles.informationD}>
                            <p>Price :</p>
                            <p> {booking.reservation.totalPrice} €</p>
                        </div>
                        <button>Edit</button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AdminRecap;
