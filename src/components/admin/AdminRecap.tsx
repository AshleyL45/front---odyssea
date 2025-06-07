import {AdminBookingDetails} from "../../@types/AdminBookingDetails";
import {AdminUserItineraryDetails} from "../../@types/AdminUserItineraryDetails";
import styles from "./AdminRecap.module.css";

type RecapData = AdminBookingDetails | AdminUserItineraryDetails;

interface AdminRecapProps {
    booking: RecapData;
    openStatusModal: () => void;
}

function isStandardBooking(booking: RecapData): booking is AdminBookingDetails {
    return "reservation" in booking;
}

const AdminRecap = ({booking, openStatusModal}: AdminRecapProps) => {
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

    const status = isStandardBooking(booking)
        ? booking.reservation.status
        : booking.status;

    const totalPrice = isStandardBooking(booking)
        ? booking.reservation.totalPrice
        : booking.startingPrice;

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
                        <p>{status}</p>
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
                        <p>{totalPrice} €</p>
                    </div>
                    <button
                        className={styles["admin-recap__button"]}
                        aria-label="Edit booking price"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AdminRecap;
