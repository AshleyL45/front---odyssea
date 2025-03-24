import React from 'react';
import {useNavigate} from "react-router-dom";
import CustomButton from "../../components/ReusableComponents/CustomButton";

const BookingMysteryTripSubmitComponent = () => {
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const reservationData = JSON.parse(localStorage.getItem('reservation') || '{}');

        try {
            const response = await fetch("http://localhost:8080/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reservationData)
            });

            if (!response.ok) {
                throw new Error("Reservation creation error");
            }
            const data = await response.json();
            console.log("ID récupéré :", data.id);

            navigate("/booking-mystery-trip/dashboard");
        } catch (error) {
            console.error("Error sending reservation:", error);
        }
    };

    return (
        <div style={{textAlign: "center", marginTop: "2rem"}}>
            <CustomButton
                variant="contained"
                onClick={handleSubmit}
                style={{color: "white", backgroundColor: "#2C3E50"}}
            >
                Submit Reservation
            </CustomButton>
        </div>
    );
};

export default BookingMysteryTripSubmitComponent;
