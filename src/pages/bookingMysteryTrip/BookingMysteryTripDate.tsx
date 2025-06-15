import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import BookingCalendar from "../../components/bookingForm/BookingCalendar";
import Pages from "../../components/layout/Pages";
import dayjs, { Dayjs } from "dayjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useBooking } from "../../contexts/BookingContext";
import { post } from "../../API/api";

const BookingMysteryTripDate: FC = () => {
    const navigate = useNavigate();
    const { questionnaireAnswers, updateResponse } = useBooking();

    // Initialisation des dates à partir du contexte
    const initialStart: Dayjs | null = questionnaireAnswers.departureDate
        ? dayjs(questionnaireAnswers.departureDate, "DD-MM-YYYY")
        : null;

    const initialEnd: Dayjs | null = questionnaireAnswers.returnDate
        ? dayjs(questionnaireAnswers.returnDate, "DD-MM-YYYY")
        : null;

    const [startDate, setStartDate] = useState<Dayjs | null>(initialStart);
    const [endDate, setEndDate] = useState<Dayjs | null>(initialEnd);
    const [calendarKey, setCalendarKey] = useState<number>(0);

    const duration = 12;
    const bookingType = "Mystery"; // ou récupérer du contexte si variable

    const handleDateSelection = (date: Dayjs | null) => {
        setStartDate(date);
        setEndDate(date ? date.add(duration, "days") : null);
    };

    const handlePrevious = () => navigate(-1);

    const resetDate = () => {
        setStartDate(null);
        setEndDate(null);
        setCalendarKey((prev) => prev + 1);
    };

    const handleNextStep = async () => {
        if (!startDate || !endDate) return;

        // format dd/MM/yyyy pour le back
        const dateStr = startDate.format("DD/MM/YYYY");
        const payload = {
            itineraryId: questionnaireAnswers.itineraryId,
            type: bookingType,
            date: dateStr,
        };

        try {
            const resp = await post("/book/step1", payload);
            if (resp?.success) {
                // mettre à jour le contexte local
                updateResponse("departureDate", startDate.format("DD-MM-YYYY"));
                updateResponse("returnDate", endDate.format("DD-MM-YYYY"));

                // naviguer vers l'étape suivante
                navigate("/booking-mystery-trip/traveller");
            } else {
                console.error("Step1 error:", resp);
                alert("Impossible de valider la date. Réessayez.");
            }
        } catch (error) {
            console.error("API error on step1:", error);
            alert("Erreur serveur lors de la validation. Réessayez plus tard.");
        }
    };

    return (
        <>
            <Pages title="Booking - Mystery Trip" >
            </Pages>

            <header>
            <div className="progress-bar">
                <div style={{ width: "100%", height: "6px", backgroundColor: "lightgrey" }} />
                <div
                    style={{
                        width: "45%",
                        height: "6px",
                        borderRadius: "0 5px 5px 0",
                        backgroundColor: "#2C3E50",
                        position: "relative",
                        top: "-6px",
                    }}
                />
            </div>

            <a
                onClick={handlePrevious}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '16px',
                    margin: '10px 40px',
                    cursor: 'pointer',
                }}
            >
                <ArrowBackIcon sx={{fontSize: '15px'}}/> previous step
            </a>
        </header>
            <main>
            <div style={{ maxWidth: "700px", margin: "0 auto", padding: "2rem 1rem", textAlign: "center" }}>
                <h1 style={{ fontSize: "25px", margin: "30px 0 10px" }}>When would you like to leave?</h1>
                <h2 style={{ margin: "20px 0 50px", fontWeight:'lighter' }}>
                    Select a departure date. Return date will be fixed at {duration} days later.
                </h2>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleNextStep();
                }}>
                <BookingCalendar key={calendarKey} days={duration} onDateSelect={handleDateSelection} />
                </form>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", marginTop: "1rem" }}>
                    <CustomButton onClick={resetDate} style={{ color: "white", backgroundColor: "#2C3E50" }}>
                        Reset
                    </CustomButton>
                    <CustomButton variant="contained" onClick={handleNextStep} disabled={!startDate || !endDate} style={{ width: "130px", marginTop: "50px" }}>
                        Next
                    </CustomButton>
                </div>
            </div>
            </main>
        </>
    );
};

export default BookingMysteryTripDate;

