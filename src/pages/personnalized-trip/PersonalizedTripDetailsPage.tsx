import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {get} from "../../API/api";
import {PersonalizedTripResponse, ItineraryDay} from "../../@types/PersonalizeTrip";
import RecapOneDay from "../../components/recapTrip/RecapOneDay";
import InteractiveMapPersItinerary from "../../components/interactiveMaps/InteractiveMapPersItinerary";
import Pages from "../../components/layout/Pages";
import {Backdrop, CircularProgress} from "@mui/material";

const PersonalizedTripDetailsPage = () => {
    const {id} = useParams();
    const [trip, setTrip] = useState<PersonalizedTripResponse | null>(null);
    const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const response = await get(`/userItinerary/${id}`);
                setTrip(response.data);
                setItineraryDays(response.data.itineraryDays || []);
            } catch (e) {
                console.error(e);
                setError("Failed to load personalized trip.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrip();
    }, [id]);


    if (error) return <p style={{color: "red"}}>{error}</p>;

    return (
        <div>
            {
                loading && !trip && <Backdrop
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={loading}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
            }
            {
                trip && (
                    <>
                        <Pages title={trip.itineraryName || "Personalized Trip"}>

                            <div style={{width: "80%", margin: "auto", textAlign: "center"}}>
                                <h2>Main information</h2>
                                <p>Start Date: <b>{trip.startDate}</b></p>
                                <p>Duration: <b>{trip.totalDuration} days</b></p>
                                <p>Departure City: <b>{trip.departureCity}</b></p>
                                <p>Starting Price: <b>{trip.startingPrice} €</b></p>
                                <p>Adults: <b>{trip.numberOfAdults}</b>, Kids: <b>{trip.numberOfKids}</b></p>

                                <h2>Options</h2>
                                {trip.options && trip.options.length > 0 ? trip.options.map((option) => (
                                    <div key={option.id}>
                                        <li>{option.name}</li>
                                        <p>{option.description}</p>
                                        <p>Price: {option.price} $</p>
                                        <p>Category: {option.category}</p>
                                    </div>
                                )) : <p>No options selected.</p>}
                            </div>

                            <h2 style={{textAlign: "center"}}>Itinerary Days</h2>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "start",
                                gap: 50,
                                padding: 40
                            }}>
                                <div className="map-wrapper">
                                    <InteractiveMapPersItinerary/>
                                </div>
                                <div className="recap-trip" style={{display: "flex", flexDirection: "column"}}>
                                    {itineraryDays.map((day) => (
                                        <RecapOneDay key={day.dayNumber} day={day}/>
                                    ))}
                                </div>
                            </div>
                        </Pages>
                    </>
                )
            }
        </div>

    );
};

export default PersonalizedTripDetailsPage;
