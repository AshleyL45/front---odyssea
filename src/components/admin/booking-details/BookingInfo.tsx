import styles from './BookingInfo.module.css'

interface BookingInfoProps {
    id: number;
    type: string;
    itineraryId: number;
}
const BookingInfo = ({id, type, itineraryId} : BookingInfoProps) => {

    return (
        <div className={styles['booking-info__container']}>
            <h2 className={styles['booking-info__title']}>Booking</h2>
            <div className={styles['booking-info__content']}>
                <p>ID : </p>
                <p>{id}</p>
            </div>
            <div className={styles['booking-info__content']}>
                <p>Type : </p>
                <p>{type}</p>
            </div>
            <div className={styles['booking-info__content']}>
                <p>Itinerary ID : </p>
                <p>{itineraryId}</p>
            </div>

        </div>
    );
};

export default BookingInfo;
