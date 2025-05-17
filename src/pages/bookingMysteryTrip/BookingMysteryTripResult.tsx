import React, {FC, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import itineraryImages from "../../assets/itineraryImages.json";
import {useReservation} from "../../contexts/ReservationContext";
import {Trip} from "../../@types/Trip";
import {get} from "../../API/api";
import {DotWave} from 'ldrs/react';
import 'ldrs/react/DotWave.css';
import ArrowDown from "../../components/mysteryTrip/BouncingArrow";

const BookingMysteryTripResult: FC = () => {
    const navigate = useNavigate();
    const {setTrip} = useReservation();

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("Prepare for the unexpected...");
    const [showArrow, setShowArrow] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

    // Clear stored results on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            setMessage("Explore your destination");
            setShowArrow(true);

            const images = itineraryImages.images || [];
            const valid = images.filter(img => img.idItinerary);
            if (valid.length) {
                const pick = valid[Math.floor(Math.random() * valid.length)];
                get(`/api/itineraries/${pick.idItinerary}`)
                    .then((fullTrip: Trip) => {
                        setTrip(fullTrip);
                        setSelectedTrip(fullTrip);
                        // Note: showImage is now controlled by arrow click only
                        localStorage.setItem("validTrip", JSON.stringify(fullTrip));
                        localStorage.setItem("mysteryTripResult", JSON.stringify(fullTrip));
                    })
                    .catch(console.error);
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [setTrip]);

    const handleArrowClick = () => {
        setShowImage(true);
    };

    const handleBooking = () => {
        navigate("/booking-mystery-trip/submit");
    };

    // Shared keyframes for shine effect
    const shineStyle = (`
    @keyframes shine {
      0% { background-position: 0% 0%; }
      50% { background-position: 100% 0%; }
      100% { background-position: 0% 0%; }
    }
  `);

    // Show initial loader and arrow
    if (!showImage) {
        return (
            <>
                <style>{shineStyle}</style>
                <div style={{
                    position: "relative",
                    height: "100vh",
                    backgroundColor: "#333",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "2rem",
                }}>
                    <h1 style={{margin: 0, fontSize: "2.5rem", fontWeight: 600}}>{message}</h1>
                    {loading && <DotWave size="47" speed="1" color="white"/>}
                    {showArrow && !loading && (
                        <div style={{marginTop: "2rem"}}>
                            <ArrowDown onClick={handleArrowClick}/>
                        </div>
                    )}
                </div>
            </>
        );
    }

    // After reveal, display trip details
    if (selectedTrip) {
        const imageUrl =
            itineraryImages.images.find(img => img.idItinerary === selectedTrip.id)?.imageUrl || "";
        return (
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
            }}>
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.5)"
                }}/>
                <div style={{position: "relative", textAlign: "center", zIndex: 1}}>
                    <h2 style={{fontSize: "2rem", marginBottom: "1rem"}}>Your next experience :</h2>
                    <h1 style={{fontSize: "3rem", marginBottom: "2rem"}}>{selectedTrip.name}</h1>

                    <CustomButton
                        className="booking-button"
                        onClick={handleBooking}
                        style={{
                            color: "white",
                            padding: "1rem 2rem",
                            background: "#2C3E50"
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
