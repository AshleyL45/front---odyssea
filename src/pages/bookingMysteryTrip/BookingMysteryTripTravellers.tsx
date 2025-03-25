// BookingFormPeople.tsx
import React, {FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import NavbarReservation from "../../components/navbars/NavbarReservationts";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {useReservation} from "../../contexts/ReservationContext";
import Pages from "../../components/layout/Pages";

const BookingFormPeople: FC = () => {
    const navigate = useNavigate();
    const {updateResponse} = useReservation();

    const [adults, setAdults] = useState(0);
    const [kids, setKids] = useState(0);

    const handleAdultChange = (delta: number) => {
        const newAdults = Math.max(0, adults + delta);
        setAdults(newAdults);
        updateResponse("numberOfAdults", newAdults);
    };

    const handleKidsChange = (delta: number) => {
        const newKids = Math.max(0, kids + delta);
        setKids(newKids);
        updateResponse("numberOfKids", newKids);
    };

    const handleNext = () => {
        if (adults === 0) {
            alert("Please select at least 1 adult.");
            return;
        }

        const reservation = JSON.parse(localStorage.getItem('reservation') || '{}');
        reservation.numberOfAdults = adults;
        reservation.numberOfKids = kids;
        localStorage.setItem('reservation', JSON.stringify(reservation));

        navigate("/booking-mystery-trip/billing");
    };

    return (
        <>
            <Pages title="Booking - Mystery Trip">
            </Pages>

            <NavbarReservation/>
            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}/>
                <div
                    style={{
                        width: "30%",
                        height: "6px",
                        borderRadius: "0 5px 5px 0",
                        backgroundColor: "#2C3E50",
                        position: "relative",
                        top: "-6px",
                    }}
                />
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "2rem",
                    marginTop: "2rem",
                }}
            >
                <span style={{fontSize: "2rem", fontWeight: "bold"}}>1. Countries</span>
                <span style={{fontSize: "2rem", fontWeight: "bold"}}>2. Dates</span>
                <span
                    style={{fontSize: "2rem", fontWeight: "bold", textDecoration: "underline"}}
                >
                    3. Travellers
                </span>
            </div>

            {/* Contenu principal : sélection du nombre de voyageurs */}
            <div style={{padding: "20px 40px", width: "70%", margin: "auto", textAlign: "center"}}>
                <h1 style={{fontSize: "25px", margin: "30px 0"}}>How many travellers are you?</h1>

                <div
                    className="container-user-select"
                    style={{display: "flex", justifyContent: "center", margin: "50px 0"}}
                >
                    {/* Bloc Adultes */}
                    <div style={{margin: "40px 60px"}}>
                        <h2>Adults</h2>
                        <div style={{display: "flex", gap: "20px", margin: "20px 0", justifyContent: "center"}}>
                            <RemoveIcon
                                onClick={() => handleAdultChange(-1)}
                                sx={{cursor: "pointer"}}
                            />
                            <p style={{border: "solid 2px black", padding: "2px 30px"}}>{adults}</p>
                            <AddIcon
                                onClick={() => handleAdultChange(1)}
                                sx={{cursor: "pointer"}}
                            />
                        </div>
                    </div>

                    {/* Bloc Enfants */}
                    <div style={{margin: "40px 60px"}}>
                        <h2>Children (-18yo)</h2>
                        <div style={{display: "flex", gap: "20px", margin: "20px 0", justifyContent: "center"}}>
                            <RemoveIcon
                                onClick={() => handleKidsChange(-1)}
                                sx={{cursor: "pointer"}}
                            />
                            <p style={{border: "solid 2px black", padding: "2px 30px"}}>{kids}</p>
                            <AddIcon
                                onClick={() => handleKidsChange(1)}
                                sx={{cursor: "pointer"}}
                            />
                        </div>
                    </div>
                </div>

                <CustomButton
                    style={{
                        width: "130px",
                        marginTop: "30px",
                        color: "white",
                        backgroundColor: adults === 0 ? "grey" : "#2C3E50",
                    }}
                    variant="contained"
                    disabled={adults === 0}
                    onClick={handleNext}
                >
                    Next
                </CustomButton>
            </div>
        </>
    );
};

export default BookingFormPeople;
