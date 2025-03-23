import React, {FC, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import itineraryImages from "../../assets/itineraryImages.json";
import {useReservation} from "../../contexts/ReservationContext";
import {Trip} from "../../@types/Trip";
import {get} from "../../API/api";

const BookingMysteryTripResult: FC = () => {
    const navigate = useNavigate();
    const {setTrip} = useReservation();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("Prepare for the unexpected...");
    const [showNotch, setShowNotch] = useState(false);
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
            setShowNotch(true);
            if (itineraryImages && itineraryImages.images && itineraryImages.images.length > 0) {
                const validTrips = itineraryImages.images.filter(
                    (image) => image.idItinerary !== 0
                );
                if (validTrips.length === 0) {
                    console.error("Aucun itinéraire valide trouvé dans le JSON.");
                    return;
                }
                const randomIndex = Math.floor(Math.random() * validTrips.length);
                const rawTrip = validTrips[randomIndex];
                console.log("Itinéraire brut sélectionné:", rawTrip);

                // Récupère les détails complets depuis le backend
                get(`/api/itineraries/${rawTrip.idItinerary}`)
                    .then((fullTrip: Trip) => {
                        console.log("Trip complet récupéré :", fullTrip);
                        if (!fullTrip || fullTrip.id === 0) {
                            console.error("L'itinéraire récupéré est invalide :", fullTrip);
                            return;
                        }
                        setTrip(fullTrip);
                        setSelectedTrip(fullTrip);
                        localStorage.setItem("validTrip", JSON.stringify(fullTrip));
                        localStorage.setItem("mysteryTripResult", JSON.stringify(fullTrip));
                    })
                    .catch((error) => {
                        console.error("Erreur lors de la récupération des détails de l'itinéraire:", error);
                    });
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [setTrip]);

    const handleNotchClick = () => {
        setShowImage(true);
        if (selectedTrip && selectedTrip.id !== 0) {
            localStorage.setItem("mysteryTripResult", JSON.stringify(selectedTrip));
            localStorage.setItem("validTrip", JSON.stringify(selectedTrip));
        } else {
            console.error("Selected trip is invalid or has an ID of 0.");
        }
    };

    const handleBooking = () => {
        navigate("/submit");
    };

    if (!showImage) {
        return (
            <div
                style={{
                    position: "relative",
                    minHeight: "100vh",
                    backgroundColor: "#333",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                }}
            >
                <h1 style={{margin: 0}}>{message}</h1>
                {loading && (
                    <div
                        style={{
                            border: "8px solid #f3f3f3",
                            borderTop: "8px solid #2C3E50",
                            borderRadius: "50%",
                            width: "60px",
                            height: "60px",
                            animation: "spin 2s linear infinite",
                            marginTop: "1rem",
                        }}
                    />
                )}
                {showNotch && !loading && (
                    <div onClick={handleNotchClick} style={{position: "absolute", bottom: "80px", cursor: "pointer"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" viewBox="0 0 24 24">
                            <path d="M12 16l-6-6h12z"/>
                        </svg>
                    </div>
                )}
                <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        );
    } else if (selectedTrip) {
        const imageUrl =
            itineraryImages.images.find((img) => img.idItinerary === selectedTrip.id)?.imageUrl || "";
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
                    animation: "slideInFromTop 1s ease-out forwards",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
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
                <div style={{position: "relative", zIndex: 12, textAlign: "center"}}>
                    <h2 style={{marginBottom: "1rem"}}>Your next experience :</h2>
                    <h1 style={{fontSize: "3rem", marginBottom: "2rem"}}>{selectedTrip.name}</h1>
                    <CustomButton onClick={handleBooking}
                                  style={{color: "white", backgroundColor: "#2C3E50", padding: "1rem 2rem"}}>
                        Booking
                    </CustomButton>
                </div>
                <style>{`
          @keyframes slideInFromTop {
            0% { transform: translateY(-100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}</style>
            </div>
        );
    } else {
        return <p>Loading trip details...</p>;
    }
};

export default BookingMysteryTripResult;
