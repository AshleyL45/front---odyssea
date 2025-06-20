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
    const [totalSelected, setTotalSelected] = useState<number>(0);
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



    useEffect(() => {
        const interval = setInterval(() => {
            const raw = localStorage.getItem("selectedActivities");
            const parsed = raw ? JSON.parse(raw) : [];
            setTotalSelected(parsed.length);
        }, 1000); // vérifie toutes les 1 seconde

        return () => clearInterval(interval); // nettoyage à la fin
    }, []);


    const generateStepSeven = async () => {
        if (selectedActivitiesIds){
            try {
                const response = await post("/generate/step6", {activities: selectedActivitiesIds});
                if (response?.success === true) {
                    navigate("/personalized-trip/standing-selection");
                    const selectedActivities = localStorage.getItem("selectedActivities");
                    if (!selectedActivities) {
                        localStorage.setItem("selectedActivities", JSON.stringify([]));
                    }
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

            <button style={{display: 'flex', alignItems: "center", fontSize: "16px", margin: "10px 40px", cursor: "pointer", border: "none", background: "none"}}
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon sx={{fontSize: "15px"}}/>
                previous step
            </button>

            {/* Afficher un bloc par pays */}
            {countrySelection.map((country) => (
                isLoader ? (
                    <CircularProgress key={country.id}/>
                ) : (
                    <ActivitySelecting
                        key={country.id}
                        countryName={country.name}
                        selectedCities={selectedCitiesByCountry[country.id] || []}
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
                    disabled={totalSelected !== selectedTrip?.numberOfActivities}
                >
                    Next
                </CustomButton>
            </div>
        </div>
    );
};

export default ActivitySelect7;
