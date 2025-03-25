import React, {useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateCalendar} from "@mui/x-date-pickers/DateCalendar";
import dayjs, {Dayjs} from "dayjs";

const DateRangePickerComponent: React.FC = () => {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    const handleDateChange = (newDate: Dayjs | null) => {
        if (!startDate) {
            // Si aucune date de début n'est sélectionnée, définir cette date comme date de début
            setStartDate(newDate);
        } else {
            // Si une date de début est déjà sélectionnée, définir la date de fin
            if (newDate && newDate.isBefore(startDate)) {
                // Si la date choisie est avant la date de début, échanger les dates
                setEndDate(startDate);
                setStartDate(newDate);
            } else {
                setEndDate(newDate);
            }
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="calender">
                <DateCalendar
                    value={startDate || endDate} // Affiche la date de début ou la date de fin, selon ce qui est défini
                    onChange={handleDateChange}
                    minDate={startDate ? startDate : undefined} // Empêche de sélectionner une date avant la date de début
                />
                {startDate && endDate && (
                    <div>
                        <p>
                            Selected Date: {startDate.format("DD/MM/YYYY")} -{" "}
                            {endDate.format("DD/MM/YYYY")}
                        </p>
                    </div>
                )}
            </div>
        </LocalizationProvider>
    );
};

export default DateRangePickerComponent;
