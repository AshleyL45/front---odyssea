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
            <dl>
                <div className={styles['booking-info__content']}>
                    <dt>Departure date : </dt>
                    <dd>{departureDate}</dd>
                </div>
                <div className={styles['booking-info__content']}>
                    <dt>Return date : </dt>
                    <dd>{returnDate}</dd>
                </div>
                <div className={styles['booking-info__content']}>
                    <dt>Purchase date : </dt>
                    <dd>{purchaseDate}</dd>
                </div>
            </dl>


        </div>
    );
};

export default DatesInfo;
