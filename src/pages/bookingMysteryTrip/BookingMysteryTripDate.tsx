import React, {FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import ReservationCalendar from "../../components/bookingForm/ReservationCalendar";
import Pages from "../../components/layout/Pages";
import dayjs, {Dayjs} from "dayjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useReservation} from "../../contexts/ReservationContext";

const BookingMysteryTripDate: FC = () => {
    const navigate = useNavigate();
    const {trip, updateResponse} = useReservation();

    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    // Fixed duration of 12 days for mystery trip
    const duration = 12;

    const handleDateSelection = (date: Dayjs | null) => {
        setStartDate(date);
        setEndDate(date ? date.add(duration, "days") : null);
    };

    const handleNextStep = () => {
        if (startDate && endDate) {
            updateResponse("departureDate", startDate.format("DD-MM-YYYY"));
            updateResponse("returnDate", endDate.format("DD-MM-YYYY"));
            navigate("/booking-mystery-trip/traveller");
        }
    };

    const handlePrevious = () => navigate(-1);
    const resetDate = () => {
        setStartDate(null);
        setEndDate(null);
    };

    return (
        <>
            <Pages title="Booking - Mystery Trip">
            </Pages>

            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}/>
                <div
                    style={{
                        width: "20%",
                        height: "6px",
                        borderRadius: "0 5px 5px 0",
                        backgroundColor: "#2C3E50",
                        position: "relative",
                        top: "-6px",
                    }}
                />
            </div>

            <p
                style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "16px",
                    margin: "10px 40px",
                    cursor: "pointer"
                }}
                onClick={handlePrevious}
            >
                <ArrowBackIcon sx={{fontSize: "15px"}}/> previous step
            </p>

            <div style={{width: "90%", textAlign: "center", margin: "0 auto"}}>
                <h1 style={{fontSize: "25px", margin: "30px 0 10px"}}>When would you like to leave?</h1>
                <p style={{margin: "20px 0 50px"}}>
                    Select a departure date. Return date will be fixed at {duration} days
                    later.
                </p>

                <ReservationCalendar days={duration} onDateSelect={handleDateSelection}/>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                    marginTop: "1rem"
                }}>
                    <CustomButton onClick={resetDate} style={{color: "white", backgroundColor: "#2C3E50"}}>
                        Reset
                    </CustomButton>
                    <CustomButton
                        variant="contained"
                        onClick={handleNextStep}
                        disabled={!startDate || !endDate}
                        style={{width: "130px", marginTop: "50px"}}
                    >
                        Next
                    </CustomButton>
                </div>
            </div>
        </>
    );
};

export default BookingMysteryTripDate;
