import {FC, JSX} from 'react';
import NavbarDashboard from "../../components/navbars/NavbarDashboard";
import Calender from "../../components/Calender";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import ReservationCalendar from "../../components/ReservationCalendar";
import {Trip} from "../../@types/Trip";
import {useNavigate} from "react-router-dom";

interface Reservation1Props {
    trip: Trip;
}

const BookingFormDate: FC<Reservation1Props> = ({trip}) => {
    const navigate = useNavigate();

    return (
            <div className="container-calender">
                <h1 style={{fontSize: "25px", margin: "30px 0 10px"}}>When would you like to leave?</h1>
                <p style={{margin: "20px 0 50px"}}>Select the departure date of your stay : </p>
                <ReservationCalendar days={trip.totalDuration}/>
                <CustomButton style={{width: "130px", marginTop: "70px"}} variant="contained" onClick={() => navigate("")}>Next</CustomButton>
            </div>
    );
};

export default BookingFormDate;
