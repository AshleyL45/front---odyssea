import {FC, JSX, useEffect, useState} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import OptionsSelecting from "../../components/persTrip/OptionsSelecting";
import {useNavigate} from "react-router-dom";
import "../../App.css"
import {get, post} from "../../API/api";
import {Backdrop, CircularProgress} from "@mui/material";
import {PersonalizedTripResponse} from "../../@types/PersonalizeTrip";
import Pages from "../../components/layout/Pages";

const OptionSelect8: ({}: {}) => JSX.Element = ({}) => {

    // allCities.find is not a function

    const navigate = useNavigate();
    const [userItinerary, setUserItinerary] = useState<PersonalizedTripResponse>()
    const [loading, setLoading] = useState(false);
    // 🔹 Récupération des infos générales de l'utilisateur
    const questionnaireAnswers = JSON.parse(localStorage.getItem("questionnaireData") || "{}");
    const [message, setMessage] = useState("");

    const options = questionnaireAnswers.options || [];

    useEffect(() => {
        console.log("Questionnaire answers" + questionnaireAnswers);
    }, []);

    const selectedOptionsIds = options.map((option: any) => option.id);
    console.log("Selected Option IDs:", selectedOptionsIds);

    const generateStepEight = async () => {
        if(!selectedOptionsIds) {
            console.warn("No options selected");
            return;
        }
        try {
            setMessage("");
            setLoading(true);
            const response = await post("/generate/step8", {options: selectedOptionsIds});
            if (response?.success != true) {
                throw new Error("Failed to post options to step8");
            }

            const itineraryData = await get("/userItinerary/generate");
            console.log("itineraryData =", itineraryData);

            setUserItinerary(itineraryData);

            navigate("/personalized-trip/recap", {
                state: {
                    itinerary: itineraryData,
                    itineraryId: itineraryData.id
                }
            });
            localStorage.setItem("itineraryId", JSON.stringify(itineraryData.data.id));
            localStorage.setItem("itinerary", JSON.stringify(itineraryData));
        } catch (e: any) {
            console.error("Error during itinerary generation:", e.message);
            setMessage(e.message);
        } finally {
            setLoading(false);
        }
    }


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

            <button
               style={{display: 'flex', alignItems: "center", fontSize: "16px", margin: "10px 40px", cursor: "pointer", border: "none", background: "none"}}
               onClick={() => navigate(-1)}>
                <ArrowBackIcon sx={{fontSize: "15px"}}/>
                previous step
            </button>

            <div className="option-select" style={{textAlign: "center", width: "95%", margin: 'auto'}} >
                <h1 style={{fontSize: "25px", margin: "40px 0 10px"}}>Would you like to add any options to your itinerary?</h1>
                <p style={{color: "grey"}}>Optional</p>
                <OptionsSelecting/>
                {message && <p style={{color: "red"}}>Sorry, our server couldn't generate your personalized trip.</p>}
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