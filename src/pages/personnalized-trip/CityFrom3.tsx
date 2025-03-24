import {FC} from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import "../../App.css";
import {useNavigate} from "react-router-dom";
import CityFromSelecting from "../../components/persTrip/CityFromSelecting";
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";
import "../../App.css"

const CityFrom3: FC = () => {
    const navigate = useNavigate();
    const {questionnaireAnswers} = usePersonalizedTrip();
    const {departureCity} = questionnaireAnswers;

    const handleNextStep = () => {
        if (departureCity) {
            navigate("/personalized-trip/country-selection");
        } else {
            alert("Please select a city before the next step.");
        }
    };

    return (
        <div>
            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div
                    style={{
                        width: "33.45%",
                        height: "6px",
                        borderRadius: "0 5px 5px 0",
                        backgroundColor: "#2C3E50",
                        position: "relative",
                        top: "-6px",
                    }}
                ></div>
            </div>
            <a
                href="#"
                style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "16px",
                    margin: "10px 40px",
                    cursor: "pointer",
                }}
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon sx={{fontSize: "15px"}}/>
                Previous step
            </a>

            <div style={{padding: "20px", width: "85%", margin: "auto", textAlign: "center"}}>
                <h1 style={{fontSize: "25px", margin: "30px 0 10px"}}>Which city are you leaving from?</h1>

                <CityFromSelecting/>

                <CustomButton
                    style={{width: "130px", marginTop: "150px"}}
                    variant="contained"
                    onClick={handleNextStep}
                    disabled={!departureCity}
                >
                    Next
                </CustomButton>
            </div>
        </div>
    );
};

export default CityFrom3;