import React, {useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateCalendar} from "@mui/x-date-pickers/DateCalendar";
import dayjs, {Dayjs} from "dayjs";

const Calender: React.FC = () => {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    const handleDateChange = (newDate: Dayjs | null) => {
        if (newDate) {
            // Si une date de départ n'est pas encore sélectionnée, on la définit et on fixe la date de fin à 13 jours après.
            setStartDate(newDate);
            setEndDate(newDate.add(13, 'day'));  // On ajoute 13 jours à la date de départ pour définir la date de fin
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
                            Date de départ: {startDate.format("DD/MM/YYYY")} -{" "}
                            Date de fin: {endDate.format("DD/MM/YYYY")}
                        </p>
                    </div>
                )}
            </div>
        </LocalizationProvider>
    );
};

export default Calender;
