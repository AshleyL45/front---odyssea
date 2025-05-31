// components/admin/booking-details/StandardBookingDetails.tsx
import {FC} from "react";
import AdminRecap from "../AdminRecap";
import BookingInfo from "./BookingInfo";
import DatesInfo from "./DatesInfo";
import OptionInfo from "./OptionInfo";
import TravelersInfo from "./TravelersInfo";
import {AdminBookingDetails} from "../../../@types/AdminBookingDetails";
import styles from "../../../pages/admin/AdminBookingDetailsPage.module.css";

interface StandardBookingDetailsProps {
    data: AdminBookingDetails;
    bookingId: number;
}

const StandardBookingDetails = ({data, bookingId} : StandardBookingDetailsProps) => {
    return (
        <>
            <AdminRecap booking={data}/>
            <section className={styles["information-section"]}>
                <BookingInfo
                    id={bookingId}
                    itineraryId={data.reservation.itineraryId}
                    type={data.reservation.type}
                />
                <DatesInfo
                    departureDate={data.reservation.departureDate}
                    returnDate={data.reservation.returnDate}
                    purchaseDate={data.reservation.purchaseDate}
                />
                <OptionInfo options={data.options}/>
                <TravelersInfo
                    numberAdults={data.reservation.numberOfAdults}
                    numberKids={data.reservation.numberOfKids}
                />
            </section>
        </>
    );
};

export default StandardBookingDetails;
