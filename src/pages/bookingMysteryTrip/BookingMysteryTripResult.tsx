import React, {FC, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import itineraryImages from "../../assets/itineraryImages.json";
import {useReservation} from "../../contexts/ReservationContext";
import {Trip} from "../../@types/Trip";
import {get} from "../../API/api";
import {DotWave} from "ldrs/react";
import 'ldrs/react/DotWave.css';

const BookingMysteryTripResult: FC = () => {
    const navigate = useNavigate();
    const {setTrip, updateResponse, questionnaireAnswers} = useReservation();
    const [loading, setLoading] = useState(true);
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        // On veut que ce fetch ne s'exécute qu'une seule fois au montage
        (async () => {
            try {
                const excluded = questionnaireAnswers.excludedCountries || [];
                const query = excluded
                    .map(c => `excludedCountries=${encodeURIComponent(c)}`)
                    .join("&");
                const allTrips: Trip[] = (await get(`/api/itineraries/valid?${query}`)) || [];

                if (allTrips.length === 0) {
                    setError("No valid itineraries found for your exclusions.");
                } else {
                    // On ne garde qu'UN seul tirage aléatoire
                    const pick = allTrips[Math.floor(Math.random() * allTrips.length)];
                    setSelectedTrip(pick);
                    setTrip(pick);                            // on stocke dans le contexte
                    updateResponse("itineraryId", pick.id);  // on remplit aussi l'ID
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load itineraries. Please try again later.");
            } finally {
                setLoading(false);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // ← vide pour ne pas relancer

    const handleBooking = () => {
        navigate("/booking-mystery-trip/submit");
    };

    if (loading) {
        return (
            <div style={{
                position: "relative",
                height: "100vh",
                backgroundColor: "#333",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
            }}>
                <DotWave size="47" speed="1" color="white"/>
            </div>
        );
    }

    if (error) {
        return (
            <p style={{textAlign: "center", padding: "2rem", color: "red"}}>
                {error}
            </p>
        );
    }

    if (!selectedTrip) {
        return (
            <p style={{textAlign: "center", padding: "2rem"}}>
                No trip available.
            </p>
        );
    }

    // On garde ton style plein écran / overlay
    const imageInfo = itineraryImages.images.find(img => img.idItinerary === selectedTrip.id);
    const backgroundStyle = imageInfo
        ? {backgroundImage: `url(${imageInfo.imageUrl})`}
        : {backgroundColor: "#333"};

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            ...backgroundStyle,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
        }}>
            <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)"
            }}/>
            <div style={{position: "relative", textAlign: "center", zIndex: 1, padding: "2rem"}}>
                <h2 style={{fontSize: "2rem", marginBottom: "1rem"}}>
                    Your next experience:
                </h2>
                <h1 style={{fontSize: "3rem", marginBottom: "1rem"}}>
                    {selectedTrip.name}
                </h1>
                <p style={{maxWidth: "600px", margin: "0 auto 2rem"}}>
                    {selectedTrip.shortDescription}
                </p>
                <CustomButton
                    onClick={handleBooking}
                    style={{color: "white", padding: "1rem 2rem"}}
                >
                    Booking
                </CustomButton>
            </div>
        </div>
    );
};

export default BookingMysteryTripResult;
