import React from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateCalendar} from "@mui/x-date-pickers/DateCalendar";
import dayjs, {Dayjs} from "dayjs";
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";

const Calender: React.FC = () => {

    const {questionnaireAnswers, updateResponse} = usePersonalizedTrip();

    const startDate = questionnaireAnswers.startDate;
    const duration = questionnaireAnswers.duration;
    const endDate = startDate ? dayjs(startDate).add(duration, "day").format("YYYY-MM-DD") : "";

    const handleDateChange = (newDate: Dayjs | null) => {
        if (newDate) {
            const departure = newDate.format("YYYY-MM-DD");
            updateResponse("startDate", departure);
        } else {
            alert("select a valid date")
        }
    };


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="calender">
                <DateCalendar
                    value={startDate ? dayjs(startDate) : null}
                    onChange={handleDateChange}
                    minDate={dayjs().add(7, 'day')}
                />
                {startDate && endDate && (
                    <div>
                        <p>
                            Departure: {dayjs(startDate).format("DD/MM/YYYY")} - {" "}
                            Return: {dayjs(endDate).format("DD/MM/YYYY")}
                        </p>
                    </div>
                )}
            </div>
        </LocalizationProvider>
    );
};

export default Calender;