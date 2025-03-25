import {FC, useState} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import OptionsSelecting from "../../components/persTrip/OptionsSelecting";
import {useNavigate} from "react-router-dom";
import "../../App.css"
import {post} from "../../API/api";
import {useAuth} from "../../contexts/AuthContext";
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";
import {CircularProgress} from "@mui/material";
import {PersonalizedTripResponse} from "../../@types/PersonalizeTrip";
import Pages from "../../components/layout/Pages";

const OptionSelect8: FC<{}> = ({}) => {

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

    const [loading, setLoading] = useState(false);
    // 🔹 Récupérer la sélection des pays
    const countrySelection = questionnaireAnswers.countrySelection;

    // 🔹 Construire l'objet de l'itinéraire
    const formattedData = {
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

    console.log(formattedData)

    const handleSubmitUserItinerary = async () => {
        try {
            setLoading(true);
            const response = await post("/userItinerary/generate", formattedData);
            /*if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }*/

            setUserItinerary(response)
            console.log("Response back : " + JSON.stringify(response, null, 2));

            navigate("/personalized-trip/recap", {state: {itinerary: response}})

        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
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

            <div className="option-select" style={{margin: "50px auto", textAlign: "center"}}>
                <h1 style={{fontSize: "25px", margin: "10px 0"}}>Would you like to add any options to your
                    itinerary?</h1>
                <p style={{color: "grey"}}>Optional</p>

                <OptionsSelecting/>

                <div style={{display: "block"}}>
                    <CustomButton style={{width: "130px"}} variant="contained"
                                  onClick={handleSubmitUserItinerary}
                    >Next</CustomButton>
                </div>

                {
                    loading && (
                        <CircularProgress/>
                    )
                }


            </div>

        </div>
    );
};

export default OptionSelect8;