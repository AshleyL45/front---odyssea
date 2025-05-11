import React, {FC, useState, useEffect} from 'react';
import Navbar from "../../components/navbars/Navbar";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import Carousel from "../../components/homePage/Carousel";
import TripDetails from "../../components/ReusableComponents/TripDetails";
import TripDetailsReverse from "../../components/ReusableComponents/TripDetailsReverse";
import Footer from "../../components/ReusableComponents/Footer";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import StickyBar from "../../components/itinerary-details/StickyBar";
import InteractiveMapTrip from '../../components/interactiveMaps/InteractiveMapTrip';
import {Day, ItineraryDetailsResponse} from "../../@types/ItineraryDetailsResponse";
import {DailyPlanWithCityDto} from '../../@types/DailyPlanWithCityDto';
import {useNavigate, useParams} from "react-router-dom";
import {get} from "../../../src/API/api";
import {useFavorites} from "../../contexts/MySelectionContext";
import {useReservation} from "../../contexts/ReservationContext";
import {useAuth} from "../../contexts/AuthContext";
import "../../App.css";
import styles from "../../styles/ItineraryDetails.module.css";

interface ItineraryImages {
    header: string[];
    countries: string[];
    days: string[];
    map: string;
}

const ItineraryDetails: FC = () => {
    const {tripId} = useParams<{ tripId: string }>();
    const itineraryId = Number(tripId);
    const {userId, token} = useAuth();
    const navigate = useNavigate();
    const {favorites, handleAddToFavorites, handleRemoveFromFavorites} = useFavorites();
    const {setTrip, updateResponse} = useReservation();

    const [itineraryToDisplay, setItineraryToDisplay] = useState<ItineraryDetailsResponse>();
    const [dailyPlans, setDailyPlans] = useState<DailyPlanWithCityDto[]>([]);
    const [images, setImages] = useState<ItineraryImages>({
        header: [],
        countries: [],
        days: [],
        map: ""
    });
    const [imgLoading, setImgLoading] = useState(true);

    const isFavorite = favorites.some(fav => fav.id === itineraryId);

    // 1) Fetch itinerary details
    useEffect(() => {
        get<ItineraryDetailsResponse>(`/api/itineraries/${itineraryId}/details`)
            .then(data => {
                if (data) setItineraryToDisplay(data);
            })
            .catch(e => console.error("Cannot get itinerary:", itineraryId, e));
    }, [itineraryId]);

    // 2) Fetch daily plans
    useEffect(() => {
        get<DailyPlanWithCityDto[] | null>(`/api/itineraries/${itineraryId}/daily`)
            .then(resp => setDailyPlans(resp ?? []))
            .catch(e => {
                console.error("Error fetching daily plans:", e);
                setDailyPlans([]);
            });
    }, [itineraryId]);

    // 3) Fetch images by role
    // 3) Fetch images by role
    useEffect(() => {
        setImages({header: [], countries: [], days: [], map: ""});
        setImgLoading(true);

        const fetchImgs = async () => {
            try {
                const roles = await get<string[]>(`/api/itinerary-images/${itineraryId}`) ?? [];

                // On ne garde qu'un seul firstHeader
                const headerRole = roles.find(r => r === 'firstHeader');
                // On prend les trois pays
                const countryRoles = ['firstCountry', 'secondCountry', 'thirdCountry'].filter(r => roles.includes(r));
                // On prend tous les jours existants (day1...dayN)
                const dayRoles = roles
                    .filter(r => r.startsWith('day'))
                    .sort((a, b) => {
                        const na = parseInt(a.replace('day', ''), 10);
                        const nb = parseInt(b.replace('day', ''), 10);
                        return na - nb;
                    });
                // La map, si elle existe
                const mapRole = roles.includes('map') ? 'map' : undefined;

                const loaded: ItineraryImages = {header: [], countries: [], days: [], map: ""};

                // Charger le header (s'il y en a un)
                if (headerRole) {
                    const res = await fetch(`/api/itinerary-images/${itineraryId}/${headerRole}`);
                    if (res.ok) {
                        const url = URL.createObjectURL(await res.blob());
                        loaded.header = [url];
                    }
                }

                // Charger les pays
                for (const cr of countryRoles) {
                    const res = await fetch(`/api/itinerary-images/${itineraryId}/${cr}`);
                    if (res.ok) {
                        loaded.countries.push(URL.createObjectURL(await res.blob()));
                    }
                }

                // Charger les days
                for (const dr of dayRoles) {
                    const res = await fetch(`/api/itinerary-images/${itineraryId}/${dr}`);
                    if (res.ok) {
                        loaded.days.push(URL.createObjectURL(await res.blob()));
                    }
                }

                // Charger la map
                if (mapRole) {
                    const res = await fetch(`/api/itinerary-images/${itineraryId}/${mapRole}`);
                    if (res.ok) {
                        loaded.map = URL.createObjectURL(await res.blob());
                    }
                }

                setImages(loaded);
            } catch (e) {
                console.error("Error loading images:", e);
            } finally {
                setImgLoading(false);
            }
        };

        fetchImgs();

        return () => {
            // Cleanup
            images.header.forEach(URL.revokeObjectURL);
            images.countries.forEach(URL.revokeObjectURL);
            images.days.forEach(URL.revokeObjectURL);
            if (images.map) URL.revokeObjectURL(images.map);
        };
    }, [itineraryId]);


    const handleFavorites = () => {
        if (!token) {
            navigate("/login", {state: {from: `/trip/${itineraryId}`}});
            return;
        }
        if (isFavorite && itineraryToDisplay) handleRemoveFromFavorites(itineraryToDisplay);
        else if (itineraryToDisplay) handleAddToFavorites(itineraryToDisplay);
    };

    const handleReservation = () => {
        if (itineraryToDisplay) {
            setTrip(itineraryToDisplay);
            updateResponse("userId", userId);
            updateResponse("itineraryId", itineraryToDisplay.id);
        }
        navigate("/booking/date");
    };

    const markerIndexes = [0, 4, 8];
    const markers = dailyPlans
        .filter((_, idx) => markerIndexes.includes(idx))
        .map(plan => ({
            dayNumber: plan.dayNumber,
            city: {name: plan.cityName, latitude: plan.latitude, longitude: plan.longitude}
        }));

    const activities = itineraryToDisplay?.days
        .filter(d => !!d.activityName)
        .map(d => d.activityName)
        .slice(0, 3) || [];

    const countries = Array.from(new Set(itineraryToDisplay?.days.map(d => d.countryName)))
        .slice(0, 3) || [];

    return (
        <div>
            <Navbar/>
            {itineraryToDisplay ? (
                <>
                    <div
                        className={styles.headerContainer}
                        style={{
                            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8),rgba(255,255,255,0.6)), url(${images.header[0] || ""})`
                        }}
                    >
                        <div style={{marginTop: "auto", marginBottom: "2rem", marginRight: "1rem"}}>
                            <h1 className={styles.headerTitle}>{itineraryToDisplay.name}</h1>
                            <hr style={{
                                marginLeft: "1rem",
                                border: "none",
                                borderTop: "1px solid white",
                                width: "80%",
                                height: "3px"
                            }}/>
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
                        }} onClick={handleFavorites}>
                            {isFavorite ? <StarIcon/> : <StarBorderIcon/>}
                            <p>{isFavorite ? "Remove from your selection" : "Add to your selection"}</p>
                        </div>
                        <CustomButton sx={{color: "white"}} onClick={handleReservation}>
                            Book your itinerary
                        </CustomButton>
                    </div>

                    <section className="itinerary-details">
                        <div style={{
                            textAlign: "center",
                            width: "80%",
                            margin: "100px auto",
                            fontWeight: 700,
                            fontStyle: "italic",
                            fontSize: "1.3rem"
                        }}>
                            <p>{itineraryToDisplay.shortDescription}</p>
                        </div>

                        <section style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gridTemplateRows: "auto auto auto",
                            width: "70%",
                            margin: "2rem auto",
                            textAlign: "center",
                            height: "50vh"
                        }}>
                            <div style={{
                                border: "1px solid black",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}>
                                <h3>Duration</h3>
                                <p>{itineraryToDisplay.totalDuration} days</p>
                            </div>
                            <div style={{
                                border: "1px solid black",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}>
                                <h3>Accommodation</h3>
                                <p>4-Stars and 5-Stars hotels</p>
                            </div>
                            <div style={{
                                border: "1px solid black",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}>
                                <h3>Key activities</h3>
                                <p style={{width: "88%", margin: "10px auto 0"}}>
                                    {activities.join(" | ")}
                                </p>
                            </div>
                            <div style={{
                                border: "1px solid black",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}>
                                <h3>Price guide</h3>
                                <p>{itineraryToDisplay.price} €</p>
                            </div>
                            <div style={{
                                gridColumn: "span 2",
                                margin: "auto",
                                border: "1px solid black",
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}>
                                <h3>Visited countries</h3>
                                <p>{countries.join(", ")}</p>
                            </div>
                        </section>

                        <div style={{width: "85%", margin: "150px auto"}}>
                            <h2 style={{
                                fontSize: "1.7rem",
                                margin: "50px 0",
                                textAlign: "center"
                            }}>
                                Your all-inclusive trip, designed for an uncompromising experience…
                            </h2>
                            <ul style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                                listStyle: "none",
                                alignItems: "center"
                            }}>
                                <li>Premium transportation: Business-class flights…</li>
                                <li>Exceptional accommodations: Refined lodges…</li>
                                <li>Exclusive activities: Private safaris…</li>
                                <li>Refined gastronomy: Dinners under the stars…</li>
                            </ul>
                        </div>
                    </section>

                    {/* Collage */}
                    <div className="collage">
                        <div className="collageItem div1">
                            {imgLoading
                                ? <div>Loading images…</div>
                                : <img src={images.countries[0] || ""} alt="Country 1"/>}
                        </div>
                        <div className="collageItem div2">
                            {imgLoading
                                ? <div>Loading…</div>
                                : <img src={images.countries[1] || ""} alt="Country 2"/>}
                        </div>
                        <div className="collageItem div3">
                            {imgLoading
                                ? <div>Loading…</div>
                                : <img src={images.countries[2] || ""} alt="Country 3"/>}
                        </div>
                    </div>

                    <section>
                        <h2 style={{
                            fontSize: "2rem",
                            textAlign: "center",
                            marginTop: "6rem",
                            marginBottom: "6rem"
                        }}>Itinerary</h2>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "300px"
                        }}>
                            <InteractiveMapTrip markers={markers}/>
                            <div>
                                {Array.from(new Set(itineraryToDisplay.days.map(d => d.cityName)))
                                    .map((cityName, index) => {
                                        const day = itineraryToDisplay.days.find(d => d.cityName === cityName);
                                        return (
                                            <div key={index} style={{margin: "10px 0"}}>
                                                <p className="span-country" style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "10px"
                                                }}>
                                                    <RoomOutlinedIcon/>
                                                    {day?.cityName}, {day?.countryName}
                                                </p>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </section>

                    <section>
                        <div>
                            <h2 style={{
                                fontSize: "2rem",
                                textAlign: "center",
                                marginTop: "16rem"
                            }}>Details of your stay</h2>
                        </div>
                        {itineraryToDisplay.days.map((day, idx) =>
                            idx % 2 === 0 ? (
                                <TripDetails key={idx} day={day} image={images.days[idx] || ""}/>
                            ) : (
                                <TripDetailsReverse key={idx} day={day} image={images.days[idx] || ""}/>
                            )
                        )}
                        <div className="trip-details-separator"/>
                    </section>

                    <div style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        marginBottom: "6rem"
                    }}>
                        <CustomButton sx={{color: "white"}} onClick={handleReservation}>
                            Book your itinerary
                        </CustomButton>
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
