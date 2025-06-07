import AdminUserItineraryRecap from "../AdminUserItineraryRecap";
import AdminRecap from "../AdminRecap";
import styles from "../../../pages/admin/AdminBookingDetailsPage.module.css";
import BookingInfo from "./BookingInfo";
import DatesInfo from "./DatesInfo";
import OptionInfo from "./OptionInfo";
import TravelersInfo from "./TravelersInfo";
import {AdminUserItineraryDetails} from "../../../@types/AdminUserItineraryDetails";
import {useState} from "react";
import EditStatusModal from "../EditStatusModal";
import EditPriceModal from "../EditPriceModal";
import {useBookingDetails} from "../../../contexts/BookingDetailsContext";

interface PersonalizedTripDetailsProps {
    data: AdminUserItineraryDetails;
}

const PersonalizedTripDetails = ({data} : PersonalizedTripDetailsProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);

    return (
        <>
            <AdminRecap booking={data} openStatusModal={() => setIsModalOpen(true)} openPriceModal={() => setIsPriceModalOpen(true)}/>
            <section className={styles["information-section"]}>
                <BookingInfo
                    id={data.id}
                    itineraryId={data.id}
                    type={"Personalized"}
                />
                <DatesInfo
                    departureDate={data.startDate}
                    returnDate={data.endDate}
                    purchaseDate={data.bookingDate}
                />
                <OptionInfo options={data.options}/>
                <TravelersInfo
                    numberAdults={data.numberOfAdults}
                    numberKids={data.numberOfKids}
                />
            </section>
            <AdminUserItineraryRecap itineraryDays={data.itineraryDays}/>
            <EditStatusModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
            <EditPriceModal isOpen={isPriceModalOpen} onClose={() => setIsPriceModalOpen(false)}/>

        </>
    );
};

export default PersonalizedTripDetails;
