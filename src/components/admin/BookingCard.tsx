import {FC, JSX} from 'react';
import AdminBooking from "../../@types/AdminBooking";
import styles from "./BookingCard.module.css"
import {useNavigate} from "react-router-dom";

interface BookingCardProps {
    booking: AdminBooking;
    type: string;
}

const BookingCard: FC<BookingCardProps> = ({booking, type}) => {
    const navigate = useNavigate();

    return (
        <div className={styles.bookingCard}>
            <section className={styles.bookingCardSection}>
                <h3  className={styles.bookingCardTitle} id={`booking-${booking.bookingId}-id`}>
                    Booking: #{booking.bookingId}
                </h3>
                <button className={styles.bookingCardSectionButton} onClick={() => navigate(`bookings/${booking.bookingId}?type=${type}`)}
                        aria-labelledby={`booking-${booking.bookingId}-id`}> Details </button>
            </section>
            <dl className={styles.bookingCardInformation}>
                <dt>Customer: </dt><dd>{booking.userFirstName} {booking.userLastName}</dd>
                <dt>Purchase date:  </dt><dd>{booking.purchaseDate}</dd>
                <dt>Price: </dt><dd>{booking.price}€</dd>
                <dt>Status: </dt><dd>{booking.status}</dd>
            </dl>
        </div>
    );
};

export default BookingCard;
