import {FC, JSX} from 'react';
import AdminBooking from "../../@types/AdminBooking";
import styles from "./BookingCard.module.css"
import {useNavigate} from "react-router-dom";

interface BookingCardProps {
    booking: AdminBooking;
}

const BookingCard: FC<BookingCardProps> = ({booking}) => {
    const navigate = useNavigate();

    return (
        <div className={styles.bookingCard}>
            <section className={styles.bookingCardSection}>
                <h3 id={`booking-${booking.bookingId}-id`}>
                    Booking: #{booking.bookingId}
                </h3>
                <a className={styles.bookingCardSectionLink} onClick={() => navigate(`/bookings/${booking.bookingId}`)}
                   aria-labelledby={`booking-${booking.bookingId}-id`}> Details </a>
            </section>
            <section className={styles.bookingCardInformation}>
                <p>Customer: {booking.userFirstName} </p>
                <p>Purchase date: {booking.purchaseDate} </p>
                <p>Price: {booking.price}€ </p>
                <p>Status: {booking.status}</p>
            </section>
        </div>
    );
};

export default BookingCard;
