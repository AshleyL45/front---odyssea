import {FC, useState} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import {useNavigate} from "react-router-dom";
import CountrySelecting from "../../components/persTrip/CountrySelecting";
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";
import "../../App.css";
import Pages from "../../components/layout/Pages";
import PersTripData from "../../assets/persTripData.json";
import {post} from "../../API/api";

const CountrySelect4: FC<{}> = ({}) => {

    const navigate = useNavigate();
    const {questionnaireAnswers} = usePersonalizedTrip();
    const {countrySelection} = questionnaireAnswers;
    const numberOfDays = questionnaireAnswers.duration;

    const selectedTrip = PersTripData.find((opt) => opt.numberOfDays === numberOfDays);

    const selectedCountriesRaw = localStorage.getItem("selectedCountries");
    const selectedCountries = selectedCountriesRaw ? JSON.parse(selectedCountriesRaw) : [];
    // On extrait uniquement les IDs :
    const selectedCountryIds = selectedCountries.map((country: any) => country.id);
    console.log(selectedCountryIds)

    const generateStepFour = async () => {
        if(selectedCountryIds){
            try {
                const response = await post("/generate/step4", {countries: selectedCountryIds});
                if (response?.success === true) {
                    navigate("/personalized-trip/city-selection");
                }
            } catch (e) {
                console.error("Cannot generate countries")
            }
        } else {
            alert("Please select the countries")
        }
    }

    // État pour suivre le nombre de pays sélectionnés
    const [selectedCountryCount, setSelectedCountryCount] = useState(countrySelection?.length || 0);

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

            <div style={{padding: "20px", margin: "auto", textAlign: "center"}}>

                <h1 style={{fontSize: "25px", margin: "30px 0 10px"}}>Select the countries</h1>

                {selectedTrip && (
                    <CountrySelecting
                        onSelectionChange={(count) => setSelectedCountryCount(count)}
                        maxCountries={selectedTrip.numberOfCountries}
                    />
                )}


                <CustomButton
                    style={{width: "130px", marginTop: "70px"}}
                    variant="contained"
                    onClick={generateStepFour}
                    disabled={selectedCountryCount !== selectedTrip?.numberOfCountries}
                >
                    Next</CustomButton>

            </div>
        </div>
    );
};

export default CountrySelect4;