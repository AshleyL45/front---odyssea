import {FC, JSX, useEffect, useState} from 'react';
import NavbarDashboard from "../../components/navbars/NavbarDashboard";
import Calender from "../../components/Calender";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import ReservationCalendar from "../../components/ReservationCalendar";
import {Trip} from "../../@types/Trip";
import {useNavigate} from "react-router-dom";
import {Dayjs} from "dayjs";
import {useReservation} from "../../contexts/ReservationContext";
import {useAuth} from "../../contexts/AuthContext";

interface Reservation1Props {
    trip: Trip;
}

const BookingFormDate: FC<Reservation1Props> = ({trip}) => {
    const navigate = useNavigate();
    const {updateResponse} = useReservation();
    const {userId} = useAuth();

    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | undefined>(undefined);

    const handleDateSelection = (date: Dayjs | null) => {
        setStartDate(date);
        setEndDate(date?.add(trip.totalDuration, "days"));
        console.log(startDate);
    };

    const handleNextStep = () => {
        updateResponse("userId", userId);
        updateResponse("itineraryId", 4);
        updateResponse("departureDate", startDate?.format('DD-MM-YYYY'));
        updateResponse("returnDate", endDate?.format('DD-MM-YYYY'));
        navigate("/booking/people");
    }


    return (
            <div className="container-calender">
                <h1 style={{fontSize: "25px", margin: "30px 0 10px"}}>When would you like to leave?</h1>
                <p style={{margin: "20px 0 50px"}}>Select the departure date of your stay : </p>
                <ReservationCalendar days={trip.totalDuration} onDateSelect={handleDateSelection}/>

                <CustomButton style={{width: "130px", marginTop: "70px"}} variant="contained"
                              onClick={handleNextStep}
                              disabled={!startDate || !endDate}>Next</CustomButton>
            </div>
    );
};

export default BookingFormDate;
