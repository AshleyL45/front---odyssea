import React, {FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import Pages from "../../components/layout/Pages";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useReservation} from "../../contexts/ReservationContext";

const BookingFormPeople: FC = () => {
    const navigate = useNavigate();
    const {questionnaireAnswers, updateResponse} = useReservation();

    const [adults, setAdults] = useState<number>(questionnaireAnswers.numberOfAdults);
    const [kids, setKids] = useState<number>(questionnaireAnswers.numberOfKids);

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
        navigate("/booking-mystery-trip/options");
    };

    const handlePrevious = () => navigate(-1);

    return (
        <>
            <Pages title="Booking - Mystery Trip">
            </Pages>

            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}/>
                <div style={{
                    width: "30%", height: "6px", borderRadius: "0 5px 5px 0",
                    backgroundColor: "#2C3E50", position: "relative", top: "-6px"
                }}/>
            </div>

            <p onClick={handlePrevious} style={{
                display: "flex", alignItems: "center", fontSize: "16px",
                margin: "10px 40px", cursor: "pointer"
            }}>
                <ArrowBackIcon sx={{fontSize: "15px"}}/> previous step
            </p>

            <div style={{padding: "20px 40px", width: "70%", margin: "auto", textAlign: "center"}}>
                <h1 style={{fontSize: "25px", margin: "30px 0"}}>
                    How many travellers are you?
                </h1>
                <div style={{display: "flex", justifyContent: "center", margin: "50px 0"}}>
                    {/* Adultes */}
                    <div style={{margin: "0 60px"}}>
                        <h2>Adults</h2>
                        <div style={{display: "flex", gap: "20px", margin: "20px 0", justifyContent: "center"}}>
                            <RemoveIcon onClick={() => handleAdultChange(-1)} sx={{cursor: "pointer"}}/>
                            <p style={{border: "2px solid black", padding: "2px 30px"}}>{adults}</p>
                            <AddIcon onClick={() => handleAdultChange(1)} sx={{cursor: "pointer"}}/>
                        </div>
                    </div>
                    {/* Enfants */}
                    <div style={{margin: "0 60px"}}>
                        <h2>Children (-18yo)</h2>
                        <div style={{display: "flex", gap: "20px", margin: "20px 0", justifyContent: "center"}}>
                            <RemoveIcon onClick={() => handleKidsChange(-1)} sx={{cursor: "pointer"}}/>
                            <p style={{border: "2px solid black", padding: "2px 30px"}}>{kids}</p>
                            <AddIcon onClick={() => handleKidsChange(1)} sx={{cursor: "pointer"}}/>
                        </div>
                    </div>
                </div>

                <CustomButton
                    variant="contained"
                    style={{
                        width: "130px",
                        marginTop: "30px",
                        color: "white",
                        backgroundColor: adults === 0 ? "grey" : "#2C3E50"
                    }}
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
