import React, {FC, useState, useEffect} from 'react';
import Navbar from "../../components/navbars/Navbar";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Carousel from "../../components/Carousel";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import {Day, ItineraryDetailsResponse} from "../../@types/ItineraryDetailsResponse";
import {useNavigate, useParams} from "react-router-dom";
import itinerariesData from "../../assets/itinerary.json";
import {get} from "../../../src/API/api";
import {useFavorites} from "../../contexts/MySelectionContext";
import StarIcon from '@mui/icons-material/Star';
import TripDetails from "../../components/ReusableComponents/TripDetails";
import TripDetailsReverse from "../../components/ReusableComponents/TripDetailsReverse";
import Footer from "../../components/Footer";
import "../../App.css";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import StickyBar from "../../components/itinerary-details/StickyBar";
import {useReservation} from "../../contexts/ReservationContext";
import {useAuth} from "../../contexts/AuthContext";
import InteractiveMapTrip from '../../components/interactiveMaps/InteractiveMapTrip';
import {DailyPlanWithCityDto} from '../../@types/DailyPlanWithCityDto';


interface ItineraryImages {
    header: string;
    countries: string[];
    map: string;
    days: string[];
}

interface Image {
    id: number;
    images: ItineraryImages;
}

const ItineraryDetails: FC<{}> = () => {
    const {tripId} = useParams<{ tripId: string }>();
    const itineraryId = Number(tripId);
    const {userId} = useAuth();
    const [itineraryToDisplay, setItineraryToDisplay] = useState<ItineraryDetailsResponse>();
    const {favorites, handleAddToFavorites, handleRemoveFromFavorites} = useFavorites();
    const navigate = useNavigate();
    const {setTrip, updateResponse} = useReservation();
    const [dailyPlans, setDailyPlans] = useState<DailyPlanWithCityDto[]>([]);

    const isFavorite = favorites.find((favorite) => favorite.id === itineraryId);

    useEffect(() => {
        const fetchItinerary = async () => {
            try {
                const itinerary = await get(`api/itineraries/${tripId}/details`);
                if (itinerary) {
                    setItineraryToDisplay(itinerary);
                }
            } catch (e) {
                console.error("Cannot get itinerary : " + tripId + " " + e);
            }
        };
        fetchItinerary();
    }, [tripId]);

    useEffect(() => {
        const fetchDailyPlans = async () => {
            try {
                const response = await get(`api/itineraries/${tripId}/daily`);
                console.log("dailyPlans response:", response);
                if (response) {
                    setDailyPlans(response);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du daily plan", error);
            }
        };

        fetchDailyPlans();
    }, [tripId]);

    const handleFavorites = () => {
        if (isFavorite && itineraryToDisplay) {
            handleRemoveFromFavorites(itineraryToDisplay);
        } else if (itineraryToDisplay) {
            handleAddToFavorites(itineraryToDisplay);
        }
    };

    const itineraryImage: Image | undefined = itinerariesData.find(
        (it) => it.id === itineraryId
    );

    const handleReservation = () => {
        if (itineraryToDisplay) {
            setTrip(itineraryToDisplay);
            updateResponse("userId", userId);
            updateResponse("itineraryId", itineraryToDisplay.id);
        }
        navigate("/booking/date");
    };

    const markerIndexes: number[] = [0, 4, 8];
    const markers = dailyPlans
        .filter((plan: DailyPlanWithCityDto, index: number) => markerIndexes.includes(index))
        .map((plan: DailyPlanWithCityDto) => ({
            dayNumber: plan.dayNumber,
            city: {
                name: plan.cityName,
                latitude: plan.latitude,
                longitude: plan.longitude,
            },
        }));


    return (
        <div>
            <Navbar/>
            {itineraryToDisplay ? (
                <>
                    <div
                        style={{
                            height: 281,
                            width: "100%",
                            backgroundImage: `url(${itineraryImage?.images.header})`,
                            display: "flex",
                            justifyContent: "flex-end",
                            alignSelf: "end",
                        }}
                    >
                        <div style={{marginTop: "auto", marginBottom: "2rem", marginRight: "1rem"}}>
                            <h1 style={{color: "white"}}>{itineraryToDisplay.name}</h1>
                            <hr
                                style={{
                                    marginLeft: "1rem",
                                    border: "none",
                                    borderTop: "1px solid white",
                                    width: "80%",
                                    height: "3px",
                                }}
                            />
                        </div>
                    </div>

                    <StickyBar/>

                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "90%",
                        margin: "2rem 1rem",
                        gap: 35
                    }}>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer"
                        }}>
                            {isFavorite ? (
                                <>
                                    <StarIcon onClick={handleFavorites}/> <p>Remove from your selection</p>
                                </>
                            ) : (
                                <>
                                    <StarBorderIcon onClick={handleFavorites}/> <p>Add to your selection</p>
                                </>
                            )}
                        </div>
                        <CustomButton sx={{color: "white"}} onClick={handleReservation}>Book your
                            itinerary</CustomButton>
                    </div>

                    <section className="itinerary-details">
                        <div style={{textAlign: "center"}}>
                            <p>{itineraryToDisplay.shortDescription}</p>
                        </div>

                        <section
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gridTemplateRows: "auto auto auto",
                                width: "70%",
                                margin: "2rem auto",
                                textAlign: "center",
                                height: "50vh",
                            }}
                        >
                            <div style={{
                                border: "1px solid black",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}>
                                <h3>Duration</h3>
                                <p>{itineraryToDisplay.totalDuration} days</p>
                            </div>
                            <div
                                style={{
                                    border: "1px solid black",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <h3>Accommodation</h3>
                                <p>4-Stars and 5-Stars hotels</p>
                            </div>
                            <div
                                style={{
                                    border: "1px solid black",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <h3>Key activities</h3>
                                <p>Hot-air balloon | Ngorongoro Crater | Coffee roasting</p>
                            </div>
                            <div
                                style={{
                                    border: "1px solid black",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <h3>Price guide</h3>
                                <p>{itineraryToDisplay.price} €</p>
                            </div>
                            <div
                                style={{
                                    gridColumn: "span 2",
                                    margin: "auto",
                                    border: "1px solid black",
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <h3>Visited countries</h3>
                                <p>South Africa, Kenya, Tanzania and Ouganda</p>
                            </div>
                        </section>

                        <div style={{textAlign: "center"}}>
                            <h2>Your all-inclusive trip, designed for an uncompromising experience. Every detail is
                                designed to offer you comfort, exclusivity and total immersion.</h2>
                            <ul>
                                <li>Premium transportation: Business-class flights, private transfers and personalized
                                    routes for a stress-free trip.
                                </li>
                                <li>Exceptional accommodations: Stay in refined lodges, 5-star hotels or private villas
                                    offering luxury and serenity.
                                </li>
                                <li>Exclusive activities: Private safaris, tailor-made excursions, meetings with expert
                                    guides and unique experiences close to nature.
                                </li>
                                <li>Refined gastronomy: dinners under the stars, exceptional wine tastings and menus
                                    designed by renowned chefs.
                                </li>
                            </ul>
                        </div>
                    </section>

                    <div className="collage">
                        <div className="collageItem div1"
                             style={{backgroundImage: `url(${itineraryImage?.images.countries[0]})`}}>
                            {/*<img src={itineraryImage?.images.countries[0]} style={{objectFit: "contain", width: "100%", height: "100%"}} />*/}
                        </div>
                        <div className="collageItem div2"
                             style={{backgroundImage: `url(${itineraryImage?.images.countries[1]})`}}></div>
                        <div className="collageItem div3"
                             style={{backgroundImage: `url(${itineraryImage?.images.countries[2]})`}}></div>
                    </div>

                    <section>
                        <h2 style={{textAlign: "center", marginTop: "6rem", marginBottom: "6rem"}}>Itinerary</h2>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "300px"}}>
                            <InteractiveMapTrip markers={markers}/>
                            <div>
                                {itineraryToDisplay.days.map((day: Day) => (
                                    <div key={day.dayNumber}>
                                        <p className="span-country">
                                            <RoomOutlinedIcon/>
                                            {day.cityName}, {day.countryName}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </section>

                    <section>
                        <div>
                            <h2 style={{textAlign: "center", marginTop: "6rem"}}>Details of your stay</h2>
                        </div>
                        {itineraryToDisplay.days.map((day: Day, index: number) =>
                            index % 2 === 0 ? (
                                <TripDetails day={day} image={itineraryImage?.images.days[index] || ""} key={index}/>
                            ) : (
                                <TripDetailsReverse day={day} image={itineraryImage?.images.days[index] || ""}
                                                    key={index}/>
                            )
                        )}
                        <div className="trip-details-separator"></div>
                    </section>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        marginBottom: "6rem"
                    }}>
                        <CustomButton sx={{color: "white"}} onClick={handleReservation}>Book your
                            itinerary</CustomButton>
                    </div>
                </>
            ) : (
                <p>Sorry, no itinerary found. Please try again later.</p>
            )}
            <Footer/>
        </div>
    );
};

export default ItineraryDetails;
