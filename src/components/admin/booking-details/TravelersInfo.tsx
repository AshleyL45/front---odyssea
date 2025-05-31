import styles from "./BookingInfo.module.css";

interface TravelersInfoProps {
    numberAdults: number;
    numberKids: number;
}
const TravelersInfo = ({numberAdults, numberKids} : TravelersInfoProps) => {
    return (
        <div className={styles['booking-info__container']}>
            <h2 className={styles['booking-info__title']}>Travelers</h2>
            <div className={styles['booking-info__content']}>
                <p>Number of adults : </p>
                <p>{numberAdults}</p>
            </div>
            <div className={styles['booking-info__content']}>
                <p>Number of kids : </p>
                <p>{numberKids}</p>
            </div>
        </div>
    );
};

export default TravelersInfo;
