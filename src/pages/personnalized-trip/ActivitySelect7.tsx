import {FC, useState, useEffect, JSX, useMemo} from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ActivitySelecting from "../../components/persTrip/ActivitySelecting";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import "../../App.css";
import {useNavigate} from "react-router-dom";
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";
import Pages from "../../components/layout/Pages";
import {CircularProgress} from "@mui/material";
import PersTripData from "../../assets/persTripData.json";
import {post} from "../../API/api";

const ActivitySelect7: () => JSX.Element = () => {
    const navigate = useNavigate();
    const [selectedActivitiesByCountry, setSelectedActivitiesByCountry] = useState<{ [key: string]: number }>({});
    const [selectedCitiesByCountry, setSelectedCitiesByCountry] = useState<{ [key: string]: any[] }>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Message d’erreur
    const [isLoader, setLoader] = useState(false);
    const {questionnaireAnswers} = usePersonalizedTrip();
    const {countrySelection} = questionnaireAnswers;
    const numberOfDays = questionnaireAnswers.duration;

    const selectedTrip = PersTripData.find((opt) => opt.numberOfDays === numberOfDays);

    const selectedActivitiesRaw = localStorage.getItem("selectedActivities");
    const selectedActivities = selectedActivitiesRaw ? JSON.parse(selectedActivitiesRaw) : [];
    const selectedActivitiesIds = selectedActivities.map((activity: any) => activity.id);
    console.log(selectedActivitiesIds);

    const generateStepSeven = async () => {
        if (selectedActivitiesIds){
            try {
                const response = await post("/generate/step6", {activities: selectedActivitiesIds});
                if (response?.success === true) {
                    navigate("/personalized-trip/option-selection");
                }
            } catch (e) {
                console.error("Cannot generate activities")
            }
        } else {
            alert("Please select the activities")
        }
    }

    // 🔹 Récupérer les villes sélectionnées pour chaque pays
    useEffect(() => {
        const citiesByCountry: { [key: string]: any[] } = {};
        countrySelection.forEach((country) => {
            const selectedCitiesFromStorage = localStorage.getItem(`selectedCities_${country.id}`);
            if (selectedCitiesFromStorage) {
                try {
                    setLoader(true)
                    const parsedCities = JSON.parse(selectedCitiesFromStorage);
                    citiesByCountry[country.id] = parsedCities;
                } catch (e) {
                    console.error("Error parsing selected cities:", e);
                }
                finally {
                    setLoader(false)
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
    const isNextDisabled = countrySelection.some((country) => {
        const selectedCount = selectedActivitiesByCountry[country.id] || 0;
        const requiredCount = (selectedTrip?.activitiesPerCities || 0) * (selectedTrip?.numberOfCities || 0) / countrySelection.length;
        return selectedCount < requiredCount;
    });


    return (
        <div>
            <Pages title="Personalized Trip">
            </Pages>
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
                    margin: "10px 30px",
                    cursor: "pointer"
                }}
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon sx={{fontSize: "15px"}}/>
                previous step
            </a>

            {/* Afficher un bloc par pays */}
            {countrySelection.map((country) => (
                isLoader ? (
                    <CircularProgress key={country.id}/>
                ) : (
                    <ActivitySelecting
                        key={country.id}
                        countryName={country.name}
                        selectedCities={selectedCitiesByCountry[country.id] || []}
                        onSelectionChange={(count) => handleSelectionChange(country.id, count)}
                        setErrorMessage={setErrorMessage}
                    />
                )
            ))}

            {/* Afficher le message d'erreur si l'utilisateur tente d'ajouter plus de 2 activités */}
            {errorMessage && (
                <p style={{color: "red", textAlign: "center", marginTop: "10px"}}>{errorMessage}</p>
            )}

            <div style={{textAlign: "center"}}>
                <CustomButton
                    style={{width: "130px"}}
                    variant="contained"
                    onClick={generateStepSeven}
                    disabled={isNextDisabled}
                >
                    Next
                </CustomButton>
            </div>
        </div>
    );
};

export default ActivitySelect7;
