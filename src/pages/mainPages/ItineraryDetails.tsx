import React, {FC, useState, useEffect} from 'react';
import Navbar from "../../components/navbars/Navbar";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Carousel from "../../components/homePage/Carousel";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import {Day, ItineraryDetailsResponse} from "../../@types/ItineraryDetailsResponse";
import {useNavigate, useParams} from "react-router-dom";
import {imageData} from "../../assets/image"
import {get} from "../../../src/API/api";
import {useFavorites} from "../../contexts/MySelectionContext";
import StarIcon from '@mui/icons-material/Star';
import TripDetails from "../../components/ReusableComponents/TripDetails";
import TripDetailsReverse from "../../components/ReusableComponents/TripDetailsReverse";
import Footer from "../../components/ReusableComponents/Footer";
import "../../App.css";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import StickyBar from "../../components/itinerary-details/StickyBar";
import {useReservation} from "../../contexts/ReservationContext";
import {useAuth} from "../../contexts/AuthContext";
import InteractiveMapTrip from '../../components/interactiveMaps/InteractiveMapTrip';
import {DailyPlanWithCityDto} from '../../@types/DailyPlanWithCityDto';
import styles from "../../styles/ItineraryDetails.module.css"


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
    const {userId, token} = useAuth();
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
        if (!token) {
            navigate("/login", {state: {from: `/trip/${itineraryId}`}});
            return;
        }
        if (isFavorite && itineraryToDisplay) {
            handleRemoveFromFavorites(itineraryToDisplay);
        } else if (itineraryToDisplay) {
            handleAddToFavorites(itineraryToDisplay);
        }
    };

    const itineraryImage: any = imageData.find(
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

    const activities = itineraryToDisplay?.days
        .filter((day) => day.activityName !== null)
        .map((day) => day.activityName)
        .slice(0, 3) || [];

    // Extraire les 3 premiers pays
    const countries = Array.from(
        new Set(itineraryToDisplay?.days.map((day) => day.countryName))
    ).slice(0, 3) || [];

    return (
        <div>
            <Navbar/>
            {itineraryToDisplay ? (
                <>
                    <div
                        className={styles.headerContainer}
                        style={{
                            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0.6)), 
                          url(${itineraryImage?.images.header[0]})`
                        }}
                    >
                        <div style={{marginTop: "auto", marginBottom: "2rem", marginRight: "1rem"}}>
                            <h1 className={styles.headerTitle}>{itineraryToDisplay.name}</h1>
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
                        <div style={{
                            textAlign: "center",
                            width: "80%",
                            margin: "100px auto",
                            fontWeight: "700",
                            fontStyle: "italic",
                            fontSize: "1.3rem"
                        }}>
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
                                <p style={{width: "88%", margin: "10px auto 0"}}>{activities.join(" | ")}</p>
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
                                <p>{countries.join(", ")}</p>
                            </div>
                        </section>

                        <div style={{width: "85%", margin: "150px auto"}}>
                            <h2 style={{fontSize: "1.7rem", margin: "50px 0", textAlign: "center",}}>
                                Your all-inclusive trip, designed for an uncompromising experience. Every detail is
                                designed to offer you comfort, exclusivity and total immersion.</h2>
                            <ul style={{display: "flex", flexDirection: "column", gap: "10px", listStyle: "none",
                                alignItems: "center"}}>
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
                        <div className="collageItem div1">
                            <img src={itineraryImage?.images.countries[0]} alt="Country"/>
                        </div>

                        <div className="collageItem div2">
                            <img src={itineraryImage?.images.countries[1]} alt="Country"/>
                        </div>
                        <div className="collageItem div3">
                            <img src={itineraryImage?.images.countries[2]} alt="Country"/>
                        </div>
                    </div>

                    <section>
                        <h2 style={{
                            fontSize: "2rem",
                            textAlign: "center",
                            marginTop: "6rem",
                            marginBottom: "6rem"
                        }}>Itinerary</h2>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "300px"}}>
                            <InteractiveMapTrip markers={markers}/>
                            <div>
                                {itineraryToDisplay && (
                                    Array.from(new Set(itineraryToDisplay.days.map((day) => day.cityName)))
                                        .map((cityName, index) => {
                                            const day = itineraryToDisplay?.days.find((day) => day.cityName === cityName);
                                            return (
                                                <div key={index} style={{margin: "10px 0"}}>
                                                    <p className="span-country"
                                                       style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                                        <RoomOutlinedIcon/>
                                                        {day?.cityName}, {day?.countryName}
                                                    </p>
                                                </div>
                                            );
                                        })
                                )}
                            </div>
                        </div>

                    </section>

                    <section>
                        <div>
                            <h2 style={{fontSize: "2rem", textAlign: "center", marginTop: "16rem"}}>Details of your
                                stay</h2>
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