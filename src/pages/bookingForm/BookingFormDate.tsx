import React, {FC, JSX, useEffect, useState} from 'react';
import NavbarDashboard from "../../components/navbars/NavbarDashboard";
import Calender from "../../components/Calender";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import ReservationCalendar from "../../components/ReservationCalendar";
import {Trip} from "../../@types/Trip";
import {useNavigate} from "react-router-dom";
import {Dayjs} from "dayjs";
import {useReservation} from "../../contexts/ReservationContext";
import {useAuth} from "../../contexts/AuthContext";
import NavbarReservation from "../../components/navbars/NavbarReservationts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Pages from "../../components/layout/Pages";


const BookingFormDate: FC<{}> = ({}) => {
    const navigate = useNavigate();
    const {trip, updateResponse} = useReservation();

    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | undefined>(undefined);

    const handleDateSelection = (date: Dayjs | null) => {
        setStartDate(date);
        setEndDate(date?.add(trip.totalDuration, "days"));
        //console.log(startDate);
    };

    const handleNextStep = () => {
        updateResponse("departureDate", startDate?.format('DD-MM-YYYY'));
        updateResponse("returnDate", endDate?.format('DD-MM-YYYY'));
        navigate("/booking/people");
    }

    const handlePreviousPage = () => {
        navigate(-1)
    }


    return (
        <>
            <Pages title="Booking Form">
            </Pages>
            <NavbarReservation/>
            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "20%",
                    height: "6px",
                    borderRadius: "0 5px 5px 0",
                    backgroundColor: "#2C3E50",
                    position: "relative",
                    top: "-6px"
                }}></div>
            </div>

            <p style={{display: 'flex', alignItems: "center", fontSize: "16px", margin: "10px 40px", cursor: "pointer"}} onClick={() => navigate(-1)}>
                <ArrowBackIcon sx={{fontSize: "15px"}}/>
                previous step
            </p>
            <div style={{width: "90%", textAlign: "center", margin: "0 auto 0"}}>

                <h1 style={{fontSize: "25px", margin: "30px 0 10px"}}>When would you like to leave?</h1>
                <p style={{margin: "20px 0 50px"}}>Select the departure date of your stay : </p>
                <ReservationCalendar days={trip.totalDuration} onDateSelect={handleDateSelection}/>

                <CustomButton style={{width: "130px", marginTop: "70px"}} variant="contained"
                              onClick={handleNextStep}
                              disabled={!startDate || !endDate}>Next</CustomButton>
            </div>
        </>

    );
};

export default BookingFormDate;
