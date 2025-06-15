import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pages from "../../components/layout/Pages";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useBooking } from "../../contexts/BookingContext";
import { post } from "../../API/api";

const BookingFormPeople: FC = () => {
  const navigate = useNavigate();
  const { questionnaireAnswers, updateResponse } = useBooking();

  const [adults, setAdults] = useState<number>(questionnaireAnswers.numberOfAdults);
  const [kids, setKids] = useState<number>(questionnaireAnswers.numberOfKids);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAdultChange = (delta: number) => {
    const newAdults = Math.max(0, adults + delta);
    setAdults(newAdults);
  };

  const handleKidsChange = (delta: number) => {
    const newKids = Math.max(0, kids + delta);
    setKids(newKids);
  };

  const handlePrevious = () => navigate(-1);

  const handleNext = async () => {
    if (adults === 0) {
      alert("Please select at least 1 adult.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        numberAdults: adults,
        numberKids: kids,
      };
      const resp = await post("/book/step2", payload);
      if (resp?.success) {
        // Mettre à jour le contexte local
        updateResponse("numberOfAdults", adults);
        updateResponse("numberOfKids", kids);
        // Naviguer vers la prochaine étape
        navigate("/booking-mystery-trip/options");
      } else {
        console.error("Step2 error:", resp);
        alert("Impossible de valider le nombre de voyageurs. Réessayez.");
      }
    } catch (error) {
      console.error("API error on step2:", error);
      alert("Erreur serveur lors de la validation. Réessayez plus tard.");
    } finally {
      setLoading(false);
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
            width: "30%",
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
      <div style={{ padding: "20px 40px", width: "70%", margin: "auto", textAlign: "center" }}>
        <h1 style={{ fontSize: "25px", margin: "30px 0" }}>How many travellers are you?</h1>

          <form onSubmit={(e) => {
              e.preventDefault();
              handleNext();
          }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "50px 0",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >

          {/* Adultes */}
          <div style={{ margin: "0 60px" }}>
            <h2>Adults</h2>
            <div style={{ display: "flex", gap: "20px", margin: "20px 0", justifyContent: "center" }}>
              <RemoveIcon onClick={() => handleAdultChange(-1)} sx={{ cursor: "pointer" }} />
              <p style={{ border: "2px solid black", padding: "2px 30px" }}>{adults}</p>
              <AddIcon onClick={() => handleAdultChange(1)} sx={{ cursor: "pointer" }} />
            </div>
          </div>
          {/* Enfants */}
          <div style={{ margin: "0 60px" }}>
            <h2>Children (-18yo)</h2>
            <div style={{ display: "flex", gap: "20px", margin: "20px 0", justifyContent: "center" }}>
              <RemoveIcon onClick={() => handleKidsChange(-1)} sx={{ cursor: "pointer" }} />
              <p style={{ border: "2px solid black", padding: "2px 30px" }}>{kids}</p>
              <AddIcon onClick={() => handleKidsChange(1)} sx={{ cursor: "pointer" }} />
            </div>
          </div>
        </div>
          </form>
        <CustomButton
          variant="contained"
          style={{
            width: "130px",
            marginTop: "30px",
            color: "white",
            backgroundColor: adults === 0 ? "grey" : "#2C3E50",
          }}
          disabled={adults === 0 || loading}
          onClick={handleNext}
        >
          {loading ? "Loading..." : "Next"}
        </CustomButton>
      </div>
        </main>
    </>
  );
};

export default BookingFormPeople;

