import React, {useEffect} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateCalendar} from "@mui/x-date-pickers/DateCalendar";
import dayjs, {Dayjs} from "dayjs";
import useLocalStorage from "../hooks/useLocalStorage";

const Calender: React.FC = () => {

    const [startDate, setStartDate] = useLocalStorage<string | null>("departureDate", null);
    const [endDate, setEndDate] = useLocalStorage<string | null>("returnDate", null);


    const handleDateChange = (newDate: Dayjs | null) => {
        if (newDate) {
            const departure = newDate.format("YYYY-MM-DD");
            const returnDate = newDate.add(13, "day").format("YYYY-MM-DD");

            setStartDate(departure);
            setEndDate(returnDate);

            console.log("date de départ : ", departure);
            console.log("date de retour : ", returnDate);
        } else {
            alert("pas possible")
        }
    };



    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="calender">
                <DateCalendar
                    value={startDate ? dayjs(startDate) : null}
                    onChange={handleDateChange}
                    minDate={dayjs()}
                />
                {startDate && endDate && (
                    <div>
                        <p>
                            Departure: {dayjs(startDate).format("DD/MM/YYYY")} -{" "}
                            Date de fin: {dayjs(endDate).format("DD/MM/YYYY")}
                        </p>
                    </div>
                )}
            </div>
        </LocalizationProvider>
    );
};

export default Calender;
