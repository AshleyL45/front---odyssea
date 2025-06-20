import {useState} from "react";
import AdminRecap from "../AdminRecap";
import BookingInfo from "./BookingInfo";
import DatesInfo from "./DatesInfo";
import OptionInfo from "./OptionInfo";
import TravelersInfo from "./TravelersInfo";
import {AdminBookingDetails} from "../../../@types/AdminBookingDetails";
import styles from "../../../pages/admin/AdminBookingDetailsPage.module.css";
import EditStatusModal from "../EditStatusModal";
import EditPriceModal from "../EditPriceModal";
import {useBookingDetails} from "../../../contexts/BookingDetailsContext";
import ConfirmationBox from "../ConfirmationBox";

interface StandardBookingDetailsProps {
    data: AdminBookingDetails;
}

const StandardBookingDetails = ({data} : StandardBookingDetailsProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
    const {bookingId} = useBookingDetails();

    return (
        <>
            <AdminRecap booking={data} openStatusModal={() => setIsModalOpen(true)} openPriceModal={() => setIsPriceModalOpen(true)}/>
            <section className={styles["information-section"]}>
                <BookingInfo
                    id={bookingId}
                    itineraryId={data.booking.itineraryId}
                    type={data.booking.type}
                />
                <DatesInfo
                    departureDate={data.booking.departureDate}
                    returnDate={data.booking.returnDate}
                    purchaseDate={data.booking.purchaseDate}
                />
                <OptionInfo options={data.options}/>
                <TravelersInfo
                    numberAdults={data.booking.numberOfAdults}
                    numberKids={data.booking.numberOfKids}
                />
            </section>
            <EditStatusModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <EditPriceModal isOpen={isPriceModalOpen} onClose={() => setIsPriceModalOpen(false)}/>
        </>
    );
};

export default StandardBookingDetails;
