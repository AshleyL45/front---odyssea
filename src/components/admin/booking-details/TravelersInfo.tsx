import styles from "./BookingInfo.module.css";

interface TravelersInfoProps {
    numberAdults: number;
    numberKids: number;
}
const TravelersInfo = ({numberAdults, numberKids} : TravelersInfoProps) => {
    return (
        <div className={styles['booking-info__container']}>
            <h2 className={styles['booking-info__title']}>Travelers</h2>
            <dl>
                <div className={styles['booking-info__content']}>
                    <dt>Number of adults : </dt>
                    <dd>{numberAdults}</dd>
                </div>
                <div className={styles['booking-info__content']}>
                    <dt>Number of kids : </dt>
                    <dd>{numberKids}</dd>
                </div>
            </dl>

        </div>
    );
};

export default TravelersInfo;
