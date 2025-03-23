import React from 'react';
import {useNavigate} from "react-router-dom";
import CustomButton from "../../components/ReusableComponents/CustomButton";

const BookingMysteryTripSubmitComponent = () => {
    const navigate = useNavigate();

    const handleSubmit = async () => {
        // Rassemblez les données de réservation depuis le localStorage (ou un contexte)
        const reservationData = JSON.parse(localStorage.getItem('reservation') || '{}');
        // Ajoutez éventuellement d'autres données collectées dans d'autres formulaires
        // Par exemple : reservationData.excludedCountries, reservationData.departureDate, etc.

        try {
            const response = await fetch("http://localhost:8080/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reservationData)
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la création de la réservation");
            }
            // La réponse contient l'id de la réservation ou du user
            const data = await response.json();
            console.log("ID récupéré :", data.id);

            navigate("/dashboard");
        } catch (error) {
            console.error("Erreur lors de l'envoi de la réservation :", error);
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
