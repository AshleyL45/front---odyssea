import {FC, useState} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import {useNavigate} from "react-router-dom";
import CountrySelecting from "../../components/persTrip/CountrySelecting";
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";
import "../../App.css";
import Pages from "../../components/layout/Pages";

const CountrySelect4: FC<{}> = ({}) => {

    const navigate = useNavigate();
    const {questionnaireAnswers} = usePersonalizedTrip();
    const {countrySelection} = questionnaireAnswers;

    // État pour suivre le nombre de pays sélectionnés
    const [selectedCountryCount, setSelectedCountryCount] = useState(countrySelection?.length || 0);

    const handleNextStep = () => {
        if (countrySelection) {
            navigate("/personalized-trip/city-selection");
        } else {
            alert("Please select 3 countries before the next step.");
        }
    };

    return (
        <div>
            <Pages title="Personalized Trip">
            </Pages>

            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "44.6%",
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

            <div style={{padding: "20px 40px", width: "70%", margin: "auto", textAlign: "center"}}>

                <h1 style={{fontSize: "25px", margin: "30px 0 10px"}}>Select 3 countries</h1>

                <CountrySelecting onSelectionChange={(count) => setSelectedCountryCount(count)}/>


                <CustomButton
                    style={{width: "130px", marginTop: "150px"}}
                    variant="contained"
                    onClick={handleNextStep}
                    disabled={selectedCountryCount !== 3}
                >
                    Next</CustomButton>

            </div>
        </div>
    );
};

export default CountrySelect4;