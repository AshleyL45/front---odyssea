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
            <dl>
                <div className={styles['booking-info__content']}>
                    <dt>ID : </dt>
                    <dd>{id}</dd>
                </div>
                <div className={styles['booking-info__content']}>
                    <dt>Type : </dt>
                    <dd>{type}</dd>
                </div>
                <div className={styles['booking-info__content']}>
                    <dt>Itinerary ID : </dt>
                    <dd>{itineraryId}</dd>
                </div>
            </dl>


        </div>
    );
};

export default BookingInfo;
