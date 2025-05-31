import {FC, JSX} from 'react';
import styles from "./BookingInfo.module.css";

interface DatesInfoProps {
    departureDate: string;
    returnDate: string;
    purchaseDate: string;
}

const DatesInfo = ({departureDate, returnDate, purchaseDate}: DatesInfoProps): JSX.Element => {

    return (
        <div className={styles['booking-info__container']}>
            <h2 className={styles['booking-info__title']}>Dates</h2>
            <div className={styles['booking-info__content']}>
                <p>Departure date : </p>
                <p>{departureDate}</p>
            </div>
            <div className={styles['booking-info__content']}>
                <p>Return date : </p>
                <p>{returnDate}</p>
            </div>
            <div className={styles['booking-info__content']}>
                <p>Purchase date : </p>
                <p>{purchaseDate}</p>
            </div>

        </div>
    );
};

export default DatesInfo;
