import {FC, JSX, useEffect, useState} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../../App.css"
import CustomButton from "../../components/ReusableComponents/CustomButton";
import {useLocation, useNavigate} from "react-router-dom";
import ItineraryNameInput from "../../components/persTrip/ItineraryNameInput";
import {ItineraryDay} from "../../@types/PersonalizeTrip";
import dayjs from "dayjs";
import RecapOneDay from "../../components/recapTrip/RecapOneDay";
import Pages from "../../components/layout/Pages"
import {patch} from "../../API/api";
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";
import InteractiveMapPersItinerary from "../../components/interactiveMaps/InteractiveMapPersItinerary";


const TripPersRecap: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const itinerary = localStorage.getItem('itinerary') ? JSON.parse(localStorage.getItem('itinerary') as string) : {};
    const {questionnaireAnswers} = usePersonalizedTrip();
    const [message, setMessage] = useState<string | null>(null);
    const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>([]);
    const [newItineraryName, setItineraryName] = useState<string>("");
    const rawItineraryId = localStorage.getItem('itineraryId');
    console.log("rawItineraryId: ", rawItineraryId)
    const itineraryId = rawItineraryId !== null ? Number(rawItineraryId) : null;


    useEffect(() => {
        if (itinerary.data && itinerary.data.itineraryDays) {
            setItineraryDays(itinerary.data.itineraryDays);
        }
        console.log("itinerary: ", itinerary)
    }, []);


    const handleSubmit = async () => {
        if(newItineraryName === null || newItineraryName == ""){
            setMessage("Please enter a name for your itinerary.");
            return;
        }
        try {
            setMessage("");
            const response = await patch(`/userItinerary/itineraryName/${itineraryId}`, {
                itineraryName: newItineraryName
            });
            if(response.success === true) {
                setMessage(null);
                navigate("/dashboard");
            }

        } catch (e) {
            console.error(e);
            setMessage("Error saving itinerary name");
        }

        localStorage.removeItem('questionnaireData');
        localStorage.removeItem('selectedActivities');
        localStorage.removeItem('selectedCountries');
        // tout ce qui commence par 'selectedCities_'
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith("selectedCities_")) {
                localStorage.removeItem(key);
            }
        });
    };

    const endDate = questionnaireAnswers.startDate
        ? dayjs(questionnaireAnswers.startDate).add(questionnaireAnswers.duration, "day").format("YYYY-MM-DD")
        : "N/A";


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItineraryName(e.target.value);
    };

    return (
        <div>
            <Pages title="Recap - Personalized Trip">
            </Pages>

            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "100%",
                    height: "6px",
                    backgroundColor: "#2C3E50",
                    position: "relative",
                    top: "-5px"
                }}></div>
            </div>

            <button
                style={{
                    display: 'flex', alignItems: "center", fontSize: "16px", margin: "10px 40px", cursor: "pointer", border: "none", background: "none"}}
                onClick={() => navigate(-1)}>
                <ArrowBackIcon sx={{fontSize: "15px"}}/>
                previous step
            </button>

            <div style={{width: "80%", margin: "auto"}}>
                <h1 style={{fontSize: "25px", margin: "50px 0 30px", textAlign: "center"}}>Summary of your trip</h1>
                <ItineraryNameInput onChange={handleInputChange} itineraryName={newItineraryName?.length > 0 ? newItineraryName : ""}/>

                <div>
                    <div style={{display: "flex", justifyContent: "center", textAlign: "center", margin: "2rem auto"}}>
                        <div>
                            <h2 style={{fontSize: "1.5rem", textAlign: "center", margin: "20px 0"}}>Main informations</h2>
                            <p>Start Date: <b>{questionnaireAnswers.startDate}</b></p>
                            <p>End Date: <b>{endDate}</b></p>
                            <p>Total Duration: <b>{questionnaireAnswers.duration} days</b></p>
                            <p>Departure City: <b>{questionnaireAnswers.departureCity}</b></p>
                            <p>Number of Adults: <b>{questionnaireAnswers.numberOfAdults}</b></p>
                            <p>Number of Kids: <b>{questionnaireAnswers.numberOfKids}</b></p>
                        </div>

                    </div>

                    <div style={{display: "flex", justifyContent: "center"}}>
                        <div>
                            {questionnaireAnswers.options && questionnaireAnswers.options.length > 0 ? (
                                    <>
                                        <h2 style={{fontSize: "1.5rem", textAlign: "center", margin: "20px 0"}}>Options</h2>
                                        {questionnaireAnswers.options.map((option: any) => (
                                            <div key={option.id} style={{marginBottom: '20px'}}>
                                                <h3>{option.name}</h3>
                                                <p>{option.description}</p>
                                                <p>Price: {option.price}$</p>
                                                <p>Category: {option.category}</p>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <p>No options were chosen.</p>
                                )
                            }
                        </div>
                    </div>
                </div>

                <h2 style={{textAlign: 'center', margin: '60px auto', fontSize: '1.5rem'}}>Total Price : {parseFloat(itinerary.data.startingPrice.toFixed(2))}$</h2>
            </div>

            <h2 style={{textAlign: "center", margin: "20px 0", fontSize: "1.5rem"}}>Itinerary Days</h2>

            <div style={{display: "flex", justifyContent: "space-around", alignItems: "start", gap: 50, padding: 40}}>
                <div className="map-wrapper">
                    <InteractiveMapPersItinerary/>
                </div>
                <div className="recap-trip">
                    <div>
                        {itineraryDays?.map((day: any) => (
                            <RecapOneDay key={day.dayNumber} day={day}/>
                        ))}
                    </div>
                </div>
            </div>


            <div className="line-recap"></div>

            <div className="submit" style={{textAlign: "center", margin: "100px auto 50px"}}>
                <p>
                    Your exceptional journey is within reach. Because every detail matters, we invite you to review your
                    itinerary one last time. From your carefully selected accommodations to the exclusive experiences
                    tailored just for you, everything has been designed to offer you a seamless escape without
                    compromise. Once your booking is confirmed, our team will ensure that every element is perfectly
                    orchestrated, delivering an experience that meets your highest expectations. All that’s left is to
                    confirm… and let yourself be carried away into an unforgettable journey.
                </p>
                { message && <p style={{color: "red", marginTop: "3rem"}}>{message}</p>}
                <CustomButton
                    type="submit"
                    style={{width: "130px", marginTop: "70px"}}
                    variant="contained"
                    onClick={handleSubmit}

                >
                    Submit
                </CustomButton>
            </div>
        </div>
    );
};

export default TripPersRecap;