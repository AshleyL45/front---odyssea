import {FC, JSX, useEffect, useState} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../../App.css"
import CustomButton from "../../components/ReusableComponents/CustomButton";
import {useLocation, useNavigate} from "react-router-dom";
import ItineraryNameInput from "../../components/persTrip/ItineraryNameInput";
import {ItineraryDay, PersonalizedTripResponse} from "../../@types/PersonalizeTrip";
import dayjs from "dayjs";
import RecapOneDay from "../../components/recapTrip/RecapOneDay";
import Pages from "../../components/layout/Pages"
import {post} from "../../API/api";
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";


const TripPersRecap: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const itinerary = location.state?.itinerary || {};
    const {questionnaireAnswers} = usePersonalizedTrip()
    const [message, setMessage] = useState("")
    const itineraryId = location.state?.itineraryId;
    //console.log(itineraryId)


    const handleSubmit = async () => {
        try {
            // Ajoutez un loading state pour éviter les interactions pendant la soumission
            setMessage("Saving...");

            if (questionnaireAnswers.itineraryName) {
                const response = await post(`/userItinerary/itineraryName/${itineraryId}`, {
                    itineraryName: questionnaireAnswers.itineraryName
                });
                setMessage(response);
            }

            // Utilisez setTimeout pour séparer la navigation de la mise à jour d'état
            setTimeout(() => navigate("/dashboard"), 100);

        } catch (e) {
            console.error(e);
            setMessage("Error saving itinerary name");
        }
    };

    const endDate = itinerary.startDate
        ? dayjs(itinerary.startDate).add(13, "day").format("YYYY-MM-DD")
        : "N/A";

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

            <a href="#"
               style={{display: 'flex', alignItems: "center", fontSize: "16px", margin: "10px 40px", cursor: "pointer"}}
               onClick={() => navigate(-1)}>
                <ArrowBackIcon sx={{fontSize: "15px"}}/>
                previous step
            </a>

            <div style={{width: "80%", margin: "auto"}}>

                <h1 style={{fontSize: "25px", margin: "50px 0 30px", textAlign: "center"}}>Summary of your trip</h1>

                <ItineraryNameInput/>
                <p>{message}</p>


                <div>
                    <div style={{display: "flex", justifyContent: "center", textAlign: "center", margin: "2rem auto"}}>
                        <div>
                            <h2 style={{textAlign: "center", margin: "20px 0"}}>Main informations</h2>
                            <p>Start Date: {itinerary.startDate}</p>
                            <p>End Date: {endDate}</p>
                            <p>Total Duration: 13 days</p>
                            <p>Departure City: {itinerary.departureCity}</p>
                            {/*<p>Starting Price: {itinerary.startingPrice} EUR</p>*/}
                            <p>Number of Adults: {itinerary.numberOfAdults}</p>
                            <p>Number of Kids: {itinerary.numberOfKids}</p>
                        </div>

                    </div>

                    <div style={{display: "flex", justifyContent: "center"}}>
                        <div>
                            {
                                itinerary.options && itinerary.options.length > 0 ? (
                                    <>
                                        <h2 style={{textAlign: "center", margin: "20px 0"}}>Options</h2>
                                        {itinerary.options.map((option: any) => (
                                            <div key={option.id} style={{marginBottom: '10px', textAlign: "center"}}>
                                                <h3>{option.name}</h3>
                                                <p>{option.description}</p>
                                                <p>Price: {option.price} $</p>
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

                <div className="recap-trip">
                    {/*<div>
                        <h2 style={{textAlign: "center", margin: "20px 0"}}>Itinerary Days</h2>

                        <div className="container-map">
                            <img
                                src="https://www.cartographie-georeflet.com/wp-content/uploads/2022/12/carte-de-france-administrative-vintage-des-departements-1.jpg"
                                alt="france map"
                                className="map"
                            />
                        </div>
                    </div>*/}
                    <div>
                        {itinerary.itineraryDays?.map((day: any) => (
                            <RecapOneDay key={day.dayNumber} day={day}/>
                        ))}
                    </div>
                </div>

                {/*<h2>Total Price : {itinerary.startingPrice} €</h2>*/}
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