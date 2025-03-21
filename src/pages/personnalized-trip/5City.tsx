import {FC} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import CitySelecting from "../../components/CitySelecting";
import "../../App.css";
import {useNavigate} from "react-router-dom";
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";

const Trip4: FC<{}> = ({}) => {
    const navigate = useNavigate();
    const {questionnaireAnswers} = usePersonalizedTrip();
    const {countrySelection} = questionnaireAnswers;
    const storedData = localStorage.getItem("questionnaireData");
    const countries = storedData ? JSON.parse(storedData) : [];


    const allCountriesValid = Array.isArray(countrySelection) && countrySelection.every((country) => {
        const selectedCities = localStorage.getItem(`selectedCities_${country.id}`);
        const parsedCities = selectedCities ? JSON.parse(selectedCities) : [];
        console.log(`Villes sélectionnées pour ${country.countryName}:`, parsedCities); // ✅ Debug
        return parsedCities.length === 2;
    });

    console.log("questionnaireAnswers:", questionnaireAnswers);
    console.log("countrySelection:", countrySelection);


    const handleNextStep = () => {
        if (allCountriesValid) {
            navigate("/personalized-trip/standing-selection");
        }
    };

    console.log("Countries:", countries);
    console.log(JSON.stringify(countries.countrySelection[0].name))

    return (
        <div>
            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "55.75%",
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

            <div className="container-city-selecting">
                <h1 style={{fontSize: "25px", margin: "30px 0", textAlign: "center"}}>Select your preferred cities:</h1>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "40px",
                    margin: "40px auto",
                    justifyContent: "center"
                }}>
                    {countries.countrySelection.map((country: any) => (
                        <div key={country.id}>
                            <div className="city-selecting">
                                <div>
                                    <h3 style={{margin: "10px 0", textAlign: "start"}}>{country.name}</h3>
                                    <p style={{color: "grey"}}>2 cities max.</p>
                                </div>
                            </div>
                            <CitySelecting countryId={country.id}/>
                        </div>
                    ))}
                </div>

                <div style={{textAlign: "center", margin: "auto"}}>
                    <CustomButton
                        style={{width: "130px", marginTop: "70px"}}
                        variant="contained"
                        onClick={handleNextStep}
                        disabled={!allCountriesValid}
                    >Next</CustomButton>
                </div>
            </div>
        </div>
    );
};

export default Trip4;