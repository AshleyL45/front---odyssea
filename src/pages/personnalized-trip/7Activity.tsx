import {FC, useState, useEffect} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ActivitySelecting from "../../components/ActivitySelecting";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import "../../App.css";
import {useNavigate} from "react-router-dom";
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";

const Trip8: FC<{}> = () => {
    const navigate = useNavigate();
    const {questionnaireAnswers} = usePersonalizedTrip();
    const {countrySelection} = questionnaireAnswers;
    const [selectedActivities, setSelectedActivities] = useState(0);
    const [selectedCitiesByCountry, setSelectedCitiesByCountry] = useState<{ [key: string]: any[] }>({});

    // Récupérer les villes sélectionnées pour chaque pays
    useEffect(() => {
        const citiesByCountry: { [key: string]: any[] } = {};
        countrySelection.forEach((country) => {
            const selectedCitiesFromStorage = localStorage.getItem(`selectedCities_${country.id}`);
            if (selectedCitiesFromStorage) {
                try {
                    const parsedCities = JSON.parse(selectedCitiesFromStorage);
                    citiesByCountry[country.id] = parsedCities;
                } catch (e) {
                    console.error("Error parsing selected cities:", e);
                }
            }
        });
        setSelectedCitiesByCountry(citiesByCountry);
    }, [countrySelection]);

    return (
        <div>
            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "78.05%",
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

            {/* Afficher un bloc par pays */}
            {countrySelection.map((country) => (
                <ActivitySelecting
                    key={country.id}
                    countryName={country.countryName}
                    selectedCities={selectedCitiesByCountry[country.id] || []}
                    onSelectionChange={(count) => setSelectedActivities((prev) => prev + count)}
                />
            ))}

            <div style={{textAlign: "center"}}>
                <CustomButton
                    style={{width: "130px", marginTop: "50px"}} variant="contained"
                    onClick={() => navigate("/personalized-trip/option-selection")}
                    disabled={selectedActivities < 2 * countrySelection.length} // Désactiver si moins de 2 activités par pays
                >
                    Next
                </CustomButton>
            </div>
        </div>
    );
};

export default Trip8;