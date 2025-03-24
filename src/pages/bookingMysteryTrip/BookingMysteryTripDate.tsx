import React, {FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import NavbarReservation from "../../components/navbars/NavbarReservationts";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateCalendar} from "@mui/x-date-pickers/DateCalendar";
import dayjs, {Dayjs} from "dayjs";

const BookingMysteryTripDate: FC = () => {
    const [departureDate, setDepartureDate] = useState<Dayjs | null>(null);
    const navigate = useNavigate();

    const formatDate = (date: Dayjs): string => {
        return date.format("DD/MM/YYYY");
    };

    const add12Days = (date: Dayjs): Dayjs => {
        return date.add(12, "day");
    };

    const handleDateSelect = (newDate: Dayjs | null) => {
        if (!departureDate && newDate) {
            setDepartureDate(newDate);
        }
    };

    const resetDate = () => {
        setDepartureDate(null);
    };

    const endDate = departureDate ? add12Days(departureDate) : null;

    const handleResultClick = () => {
        if (departureDate) {
            localStorage.setItem("departureDate", departureDate.toISOString());
            const retDate = add12Days(departureDate);
            localStorage.setItem("returnDate", retDate.toISOString());
            navigate("/booking-mystery-trip/traveller");
        }
    };

    return (
        <>
            <NavbarReservation/>
            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}/>
                <div
                    style={{
                        width: "30%",
                        height: "6px",
                        borderRadius: "0 5px 5px 0",
                        backgroundColor: "#2C3E50",
                        position: "relative",
                        top: "-6px",
                    }}
                />
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "2rem",
                    marginTop: "2rem",
                }}
            >
                <span style={{fontSize: "2rem", fontWeight: "bold"}}>1. Countries</span>
                <span
                    style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        textDecoration: "underline",
                    }}
                >
          2. Dates
        </span>
                <span style={{fontSize: "2rem", fontWeight: "bold"}}>3. Travellers</span>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "flex-start",
                    marginTop: "3rem",
                }}
            >
                <div
                    style={{
                        width: "40%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    <h2 style={{fontSize: "2rem"}}>Choose your availability</h2>
                    <p style={{fontSize: "1rem", lineHeight: "1.5"}}>
                        Select departure date. Dates prior to today cannot be selected.
                        Once the date has been selected, your trip will automatically end 12 days later.
                    </p>
                    <div>
                        <CustomButton
                            disabled={!departureDate}
                            onClick={handleResultClick}
                            style={{
                                color: "white",
                                backgroundColor: departureDate ? "#2C3E50" : "grey",
                            }}
                        >
                            Result
                        </CustomButton>
                    </div>
                </div>

                <div
                    style={{
                        width: "40%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        alignItems: "center",
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div style={{pointerEvents: departureDate ? "none" : "auto"}}>
                            <DateCalendar
                                value={departureDate}
                                onChange={handleDateSelect}
                                minDate={dayjs().startOf("day")}
                            />
                        </div>
                    </LocalizationProvider>

                    <CustomButton
                        onClick={resetDate}
                        style={{color: "white", backgroundColor: "#2C3E50"}}
                    >
                        Reset
                    </CustomButton>

                    {departureDate && endDate && (
                        <p style={{marginTop: "1rem", textAlign: "center"}}>
                            Your journey begins on <strong>{formatDate(departureDate)}</strong> and will end on{" "}
                            <strong>{formatDate(endDate)}</strong>.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default BookingMysteryTripDate;
