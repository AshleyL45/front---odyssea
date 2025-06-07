import {AdminBookingDetails} from "../../@types/AdminBookingDetails";
import {AdminUserItineraryDetails} from "../../@types/AdminUserItineraryDetails";
import styles from "./AdminRecap.module.css";
import {useBookingDetails} from "../../contexts/BookingDetailsContext";

type RecapData = AdminBookingDetails | AdminUserItineraryDetails;
interface AdminRecapProps {
    booking: RecapData;
    openStatusModal: () => void;
    openPriceModal: () => void;
}

function isStandardBooking(booking: RecapData): booking is AdminBookingDetails {
    return "reservation" in booking;
}

const AdminRecap = ({booking, openStatusModal, openPriceModal}: AdminRecapProps) => {
    const {bookingStatus, bookingPrice} = useBookingDetails();
    const itineraryName = booking.itineraryName;

    const itineraryId = isStandardBooking(booking)
        ? booking.reservation.itineraryId
        : booking.id;

    const itineraryTitle =
        itineraryName?.trim()
            ? itineraryName
            : `Itinerary ID ${itineraryId}`;

    const purchaseDate = isStandardBooking(booking)
        ? booking.reservation.purchaseDate
        : booking.bookingDate;


    return (
        <section className={styles["admin-recap"]}>
            <h2 className={styles["adminRecap__title"]}>{itineraryTitle}</h2>
            <hr/>
            <div className={styles["admin-recap__section"]}>
                <div className={styles["admin-recap__info"]}>
                    <p className={styles["admin-recap__label"]}>Purchase:</p>
                    <p>{purchaseDate}</p>
                </div>

                <div className={styles["admin-recap__item"]} role="group" aria-labelledby="status-label">
                    <div className={styles["admin-recap__info"]}>
                        <p className={styles["admin-recap__label"]} id="status-label">
                            Status:
                        </p>
                        <p>{bookingStatus}</p>
                    </div>
                    <button
                        className={styles["admin-recap__button"]}
                        aria-label="Edit booking status"
                        onClick={openStatusModal}
                    >
                        Edit
                    </button>
                </div>

                <div className={styles["admin-recap__item"]} role="group" aria-labelledby="price-label">
                    <div className={styles["admin-recap__info"]}>
                        <p className={styles["admin-recap__label"]} id="price-label">
                            Price:
                        </p>
                        <p>{bookingPrice} €</p>
                    </div>
                    <button
                        className={styles["admin-recap__button"]}
                        aria-label="Edit booking price"
                        onClick={openPriceModal}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AdminRecap;
