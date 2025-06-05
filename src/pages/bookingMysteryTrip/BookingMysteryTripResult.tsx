import React, {FC, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import itineraryImages from "../../assets/itineraryImages.json";
import {useReservation} from "../../contexts/ReservationContext";
import {Trip} from "../../@types/Trip";
import {get} from "../../API/api";
import {DotWave} from "ldrs/react";
import "ldrs/react/DotWave.css";
import BouncingArrow from "../../components/mysteryTrip/BouncingArrow";

interface ApiResp<T> {
    success: boolean;
    message: string;
    data: T;
}

const BookingMysteryTripResult: FC = () => {
    const navigate = useNavigate();
    const {setTrip, questionnaireAnswers} = useReservation();

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("Prepare for the unexpected...");
    const [showArrow, setShowArrow] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

    useEffect(() => {
        localStorage.removeItem("mysteryTripResult");
        localStorage.removeItem("validTrip");
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            setMessage("Explore your destination");
            setShowArrow(true);

            const images = itineraryImages.images || [];
            const valid = images.filter(img => img.idItinerary != null);
            if (valid.length > 0) {
                const pick = valid[Math.floor(Math.random() * valid.length)];
                get<ApiResp<Trip>>(`/api/itineraries/${pick.idItinerary}`)
                    .then(envelope => {
                        if (!envelope?.data) {
                            console.error("No trip data returned");
                            return;
                        }
                        const fullTrip = envelope.data;
                        setTrip(fullTrip);
                        setSelectedTrip(fullTrip);
                        localStorage.setItem("validTrip", JSON.stringify(fullTrip));
                        localStorage.setItem("mysteryTripResult", JSON.stringify(fullTrip));
                    })
                    .catch(console.error);
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [setTrip]);

    const handleArrowClick = () => setShowImage(true);
    const handleBooking = () => navigate("/booking-mystery-trip/submit");

    if (!showImage) {
        return (
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "#333",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    overflow: "hidden",
                }}
            >
                <h1
                    style={{
                        margin: 0,
                        fontSize: "clamp(1.5rem, 6vw, 3rem)",
                        fontWeight: 600,
                        maxWidth: "100%",
                        lineHeight: 1.2,
                    }}
                >
                    {message}
                </h1>
                {loading ? (
                    <div style={{marginTop: "2rem"}}>
                        <DotWave size={55} speed={1.4} color="white"/>
                    </div>
                ) : (
                    showArrow && (
                        <div style={{marginTop: "3rem"}}>
                            <BouncingArrow onClick={handleArrowClick}/>
                        </div>
                    )
                )}
            </div>
        );
    }

    if (selectedTrip) {
        const imageUrl =
            itineraryImages.images.find(img => img.idItinerary === selectedTrip.id)
                ?.imageUrl || "";

        return (
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "slideInFromTop 1s ease-out forwards",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        zIndex: 11,
                    }}
                />
                <div
                    style={{
                        position: "relative",
                        zIndex: 12,
                        textAlign: "center",
                        color: "white",
                        padding: "1rem",
                    }}
                >
                    <h2 style={{marginBottom: "1rem", fontSize: "2rem"}}>
                        Your next experience:
                    </h2>
                    <h1 style={{fontSize: "3rem", marginBottom: "2rem"}}>
                        {selectedTrip.name}
                    </h1>
                    <CustomButton
                        onClick={handleBooking}
                        style={{
                            color: "white",
                            backgroundColor: "#2C3E50",
                            padding: "1rem 2rem",
                            fontSize: "1.2rem",
                        }}
                    >
                        Booking
                    </CustomButton>
                </div>
            </div>
        );
    }

    return <p style={{textAlign: "center", paddingTop: "2rem"}}>Loading trip details...</p>;
};

export default BookingMysteryTripResult;
