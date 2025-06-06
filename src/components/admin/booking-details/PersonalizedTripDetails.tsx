import AdminUserItineraryRecap from "../AdminUserItineraryRecap";
import AdminRecap from "../AdminRecap";
import styles from "../../../pages/admin/AdminBookingDetailsPage.module.css";
import BookingInfo from "./BookingInfo";
import DatesInfo from "./DatesInfo";
import OptionInfo from "./OptionInfo";
import TravelersInfo from "./TravelersInfo";
import {AdminUserItineraryDetails} from "../../../@types/AdminUserItineraryDetails";
import {useState} from "react";

interface PersonalizedTripDetailsProps {
    data: AdminUserItineraryDetails;
}

const PersonalizedTripDetails = ({data} : PersonalizedTripDetailsProps) => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <>
            <AdminRecap booking={data} openModal={() => setModalOpen(true)}/>
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
        </>
    );
};

export default PersonalizedTripDetails;
