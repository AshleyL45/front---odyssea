import {useState} from "react";
import AdminRecap from "../AdminRecap";
import BookingInfo from "./BookingInfo";
import DatesInfo from "./DatesInfo";
import OptionInfo from "./OptionInfo";
import TravelersInfo from "./TravelersInfo";
import {AdminBookingDetails} from "../../../@types/AdminBookingDetails";
import styles from "../../../pages/admin/AdminBookingDetailsPage.module.css";
import EditStatus from "../EditStatus";

type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";
interface StandardBookingDetailsProps {
    data: AdminBookingDetails;
    bookingId: number;
    onStatusUpdate: (newStatus: BookingStatus) => void;
}

const StandardBookingDetails = ({data, bookingId, onStatusUpdate} : StandardBookingDetailsProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <AdminRecap booking={data} openStatusModal={() => setIsModalOpen(true)}/>
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
            <EditStatus bookingType={"Standard"} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} bookingId={data.reservation.reservationId} onStatusChange={onStatusUpdate}/>
        </>
    );
};

export default StandardBookingDetails;
