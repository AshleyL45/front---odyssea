import {FC, useState} from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import "../../App.css";
import {useNavigate} from "react-router-dom";
import CityFromSelecting from "../../components/persTrip/CityFromSelecting";
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";
import "../../App.css";
import Pages from "../../components/layout/Pages";
import {post} from "../../API/api";


const CityFrom3: FC = () => {
    const navigate = useNavigate();
    const {questionnaireAnswers} = usePersonalizedTrip();
    const {departureCity} = questionnaireAnswers;
    const [isValidCity, setIsValidCity] = useState(false);


    const generateStepThree = async () => {
        if (departureCity) {
            try {
                const response = await post("/generate/step2", {departureCity: departureCity});
                if (response?.success === true) {
                    navigate("/personalized-trip/country-selection");
                }
            } catch (e) {
                console.error('Cannot generate step 3 (departureCity)')
            }
        } else {
            alert("Please select a city before the next step.");
        }
    };

    return (
        <div>
            <Pages title="Personalized Trip">
            </Pages>

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
            <button style={{
                display: 'flex',
                alignItems: "center",
                fontSize: "16px",
                margin: "10px 40px",
                cursor: "pointer",
                border: "none",
                background: "none"
            }}
                    onClick={() => navigate(-1)}
            >
                <ArrowBackIcon sx={{fontSize: "15px"}}/>
                previous step
            </button>

            <div style={{padding: "20px", width: "85%", margin: "auto", textAlign: "center"}}>
                <h1 style={{fontSize: "25px", margin: "30px 0"}}>Which city are you leaving from?</h1>

                <CityFromSelecting onFilledChange={setIsValidCity}/>

                <CustomButton
                    style={{width: "130px", marginTop: "70px"}}
                    variant="contained"
                    onClick={generateStepThree}
                    disabled={!isValidCity}
                >
                    Next
                </CustomButton>
            </div>
        </div>
    );
};

export default CityFrom3;