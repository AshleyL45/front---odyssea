import {FC, JSX, useState} from "react";
import {Dayjs} from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateCalendar} from "@mui/x-date-pickers/DateCalendar";
import CustomButton from "../ReusableComponents/CustomButton";

interface ReservationCalendar {
    days: number;
    onDateSelect: (date: Dayjs | null) => void;
}

const ReservationCalendar: FC<ReservationCalendar> = ({days, onDateSelect}) => {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    const handleDateChange = (newDate: Dayjs | null) => {
        if (newDate) {
            setStartDate(newDate);
            setEndDate(newDate.add(days, 'day'));  // On ajoute les jours à la date de départ pour définir la date de fin
            onDateSelect(newDate);
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
                        <p>Select
                            Departure date: {startDate.format("DD/MM/YYYY")} -{" "}
                            End date: {endDate.format("DD/MM/YYYY")}
                        </p>
                    </div>
                )}
            </div>
        </LocalizationProvider>
    );
};

export default ReservationCalendar;