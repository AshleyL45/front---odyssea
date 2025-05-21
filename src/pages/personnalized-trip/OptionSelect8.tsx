import {FC, JSX, useEffect, useState} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import OptionsSelecting from "../../components/persTrip/OptionsSelecting";
import {useNavigate} from "react-router-dom";
import "../../App.css"
import {post} from "../../API/api";
import {useAuth} from "../../contexts/AuthContext";
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";
import {Backdrop, CircularProgress} from "@mui/material";
import {PersonalizedTripResponse} from "../../@types/PersonalizeTrip";
import Pages from "../../components/layout/Pages";

const OptionSelect8: ({}: {}) => JSX.Element = ({}) => {

    const navigate = useNavigate();
    const {userId} = useAuth();
    const [userItinerary, setUserItinerary] = useState<PersonalizedTripResponse>()

    // 🔹 Récupération des infos générales de l'utilisateur
    const questionnaireAnswers = JSON.parse(localStorage.getItem("questionnaireData") || "{}");

    const startDate = questionnaireAnswers.startDate || "";
    const departureCity = questionnaireAnswers.departureCity || "";
    const numberOfAdults = questionnaireAnswers.numberOfAdults || 0;
    const numberOfKids = questionnaireAnswers.numberOfKids || 0;
    const hotelStanding = questionnaireAnswers.hotelStanding || 0;
    const itineraryName = questionnaireAnswers.itineraryName || "null";
    const options = questionnaireAnswers.options || [];

    console.log(options)
    let selectedOptions: any[] = [];

    try {
        selectedOptions = options ? JSON.parse(options) : [];
        if (!Array.isArray(selectedOptions)) {
            console.error("Parsed options is not an array:", selectedOptions);
            selectedOptions = [];
        }
    } catch (e) {
        console.error("Error parsing options from localStorage:", e);
        selectedOptions = [];
    }

    const selectedOptionsIds = selectedOptions.map((option) => option.id);
    console.log(selectedOptionsIds);


    const generateStepEight = async () => {
        if(selectedOptionsIds){
            try {
                const response = await post("/generate/step8", {options: selectedOptionsIds});
                if (response?.success === true) {
                    navigate("/personalized-trip/activity-selection");
                }
            } catch (e) {
                console.error("Cannot generate options")
            }
        }
    }



    const [loading, setLoading] = useState(false);
    // 🔹 Récupérer la sélection des pays

    // 🔹 Construire l'objet de l'itinéraire
    /* const formattedData = {
        userId,
        startDate,
        departureCity,
        numberOfAdults,
        numberOfKids,
        hotelStanding,
        itineraryName,

        countrySelection: countrySelection.map((country: any) => {
            // Récupérer les villes sélectionnées pour ce pays
            const selectedCities = JSON.parse(localStorage.getItem(`selectedCities_${country.id}`) || "[]");

            return {
                countryName: country.name,
                citySelection: selectedCities.map((city: any) => {
                    // Récupérer les activités sélectionnées pour cette ville
                    const selectedActivities = JSON.parse(localStorage.getItem(`selectedActivitiesByCity_${city.id}`) || "[]");

                    return {
                        cityName: city.name,
                        activities: selectedActivities.map((activity: any) => ({
                            id: activity.id,
                            cityId: city.id,
                            name: activity.name,
                            type: activity.type,
                            physicalEffort: activity.physicalEffort,
                            duration: activity.duration,
                            description: activity.description,
                            price: activity.price,
                        })),
                    };
                }),
            };
        }),
        options,
    };

    //console.log(formattedData)

    const handleSubmitUserItinerary = async () => {
        try {
            setLoading(true);
            const response = await post("/userItinerary/generate", formattedData);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            setUserItinerary(response)
            console.log("Response back : " + JSON.stringify(response, null, 2));

            navigate("/personalized-trip/recap", {state: {itinerary: response, itineraryId: response.id}})

        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false);
        }
    } */

    const [loadingText, setLoadingText] = useState("Creating your personalized itinerary...");

    useEffect(() => {
        if (!loading) return;

        const messages = [
            "Analyzing your preferences...",
            "Be ready for an exceptional experience...",
            "Finalizing the details...",
            "Almost there..."
        ];

        let currentIndex = 0;
        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % messages.length;
            setLoadingText(messages[currentIndex]);
        }, 5000);

        return () => clearInterval(interval);
    }, [loading]);

    return (
        <div>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.9)'
                }}
                open={loading}
            >
                <div style={{textAlign: 'center'}}>
                    <CircularProgress color="inherit" size={80} thickness={4}/>
                    <p style={{marginTop: '20px', fontSize: '1.5rem'}}>
                        {loadingText}
                    </p>
                </div>
            </Backdrop>

            <Pages title="Personalized Trip">
            </Pages>

            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "89.2%",
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

            <div className="option-select" style={{textAlign: "center", width: "95%", margin: 'auto'}} >
                <h1 style={{fontSize: "25px", margin: "40px 0 10px"}}>Would you like to add any options to your itinerary?</h1>
                <p style={{color: "grey"}}>Optional</p>
                <OptionsSelecting/>
                <div style={{display: "block"}}>
                    <CustomButton
                        style={{width: "130px"}}
                        variant="contained"
                        onClick={generateStepEight}
                    >
                        Next
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};

export default OptionSelect8;