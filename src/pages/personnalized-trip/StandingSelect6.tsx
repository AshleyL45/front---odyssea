import {FC, JSX} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import HotelSelecting from "../../components/persTrip/HotelSelecting";
import "../../App.css"
import {useNavigate} from "react-router-dom";
import Pages from "../../components/layout/Pages";
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";
import {post} from "../../API/api";

const StandingSelect6: ({}: {}) => JSX.Element = ({}) => {

    const navigate = useNavigate();
    const {questionnaireAnswers} = usePersonalizedTrip();
    const {hotelStanding} = questionnaireAnswers;

    const generateStepSix = async () => {
        if(hotelStanding) {
            try {
                const response = await post("/generate/step7", {hotelStanding: hotelStanding});
                if (response?.success === true) {
                    navigate("/personalized-trip/activity-selection");
                }
            } catch (e) {
                console.error("Cannot generate hotel standing")
            }
        }
    }

    return (
        <div>
            <Pages title="Personalized Trip">
            </Pages>

            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "66.9%",
                    height: "6px",
                    borderRadius: "0 5px 5px 0",
                    backgroundColor: "#2C3E50",
                    position: "relative",
                    top: "-6px"
                }}></div>
            </div>

            <a href="#"
               style={{display: 'flex', alignItems: "center", fontSize: "16px", margin: "10px 40px", cursor: "pointer"}}
               onClick={() => navigate(-1)}>
                <ArrowBackIcon sx={{fontSize: "15px"}}/>
                previous step
            </a>

            <div className="hotel-select" style={{margin: "100px auto", textAlign: "center"}}>
                <h1 style={{fontSize: "25px", margin: "30px 0 10px"}}>Select your hotel standing</h1>
                <HotelSelecting/>
                <CustomButton
                    style={{width: "130px", marginTop: "70px"}} variant="contained"
                    onClick={generateStepSix}
                >
                    Next
                </CustomButton>
            </div>
        </div>
    );
};

export default StandingSelect6;