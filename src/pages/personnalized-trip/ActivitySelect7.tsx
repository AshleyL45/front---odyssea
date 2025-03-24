import {FC, useState, useEffect} from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ActivitySelecting from "../../components/persTrip/ActivitySelecting";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import "../../App.css";
import {useNavigate} from "react-router-dom";
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";

const ActivitySelect7: FC<{}> = () => {
    const navigate = useNavigate();
    const {questionnaireAnswers} = usePersonalizedTrip();
    const {countrySelection} = questionnaireAnswers;
    const [selectedActivitiesByCountry, setSelectedActivitiesByCountry] = useState<{ [key: string]: number }>({});
    const [selectedCitiesByCountry, setSelectedCitiesByCountry] = useState<{ [key: string]: any[] }>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Message d’erreur

    // 🔹 Récupérer les villes sélectionnées pour chaque pays
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

    // 🔹 Met à jour le nombre total d’activités sélectionnées par pays
    const handleSelectionChange = (countryId: string, count: number) => {
        setSelectedActivitiesByCountry((prev) => ({
            ...prev,
            [countryId]: count
        }));
    };

    // 🔹 Vérifier si chaque pays a au moins 2 activités sélectionnées
    const isNextDisabled = countrySelection.some(
        (country) => (selectedActivitiesByCountry[country.id] || 0) *3 < 12
    );

    return (
        <div>
            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div
                    style={{
                        width: "78.05%",
                        height: "6px",
                        borderRadius: "0 5px 5px 0",
                        backgroundColor: "#2C3E50",
                        position: "relative",
                        top: "-6px"
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
                    cursor: "pointer"
                }}
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon sx={{fontSize: "15px"}}/>
                previous step
            </a>

            {/* Afficher un bloc par pays */}
            {countrySelection.map((country) => (
                <ActivitySelecting
                    key={country.id}
                    countryName={country.name}
                    selectedCities={selectedCitiesByCountry[country.id] || []}
                    onSelectionChange={(count) => handleSelectionChange(country.id, count)}
                    setErrorMessage={setErrorMessage} // Permet d'afficher un message d'erreur si trop d'activités
                />
            ))}

            {/* Afficher le message d'erreur si l'utilisateur tente d'ajouter plus de 2 activités */}
            {errorMessage && (
                <p style={{color: "red", textAlign: "center", marginTop: "10px"}}>{errorMessage}</p>
            )}

            <div style={{textAlign: "center"}}>
                <CustomButton
                    style={{width: "130px", marginTop: "50px"}}
                    variant="contained"
                    onClick={() => navigate("/personalized-trip/option-selection")}
                    disabled={isNextDisabled} // Désactiver si moins de 2 activités par pays
                >
                    Next
                </CustomButton>
            </div>
        </div>
    );
};

export default ActivitySelect7;
