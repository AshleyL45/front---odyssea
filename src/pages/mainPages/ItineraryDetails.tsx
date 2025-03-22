import React, {FC, useState, useEffect} from 'react';
import Navbar from "../../components/navbars/Navbar";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Carousel from "../../components/Carousel";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import {Day, ItineraryDetailsResponse} from "../../@types/ItineraryDetailsResponse";
import {useNavigate, useParams} from "react-router-dom";
import itinerariesData from "../../assets/itinerary.json"
import {get} from "../../../src/API/api"
import {useFavorites} from "../../contexts/MySelectionContext";
import StarIcon from '@mui/icons-material/Star';
import TripDetails from "../../components/ReusableComponents/TripDetails"
import TripDetailsReverse from "../../components/ReusableComponents/TripDetailsReverse";
import Footer from "../../components/Footer";
import "../../App.css"
import CustomButton from "../../components/ReusableComponents/CustomButton";
import StickyBar from "../../components/itinerary-details/StickyBar";
import {useReservation} from "../../contexts/ReservationContext";
import {useAuth} from "../../contexts/AuthContext";
import {dataY} from "../../assets/image"
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

const ItineraryDetails: FC<{}> = ({}) => {

    const {tripId} = useParams<{ tripId: string }>();
    const itineraryId = Number(tripId);
    const {userId, token} = useAuth();
    const [itineraryToDisplay, setItineraryToDisplay] = useState<ItineraryDetailsResponse>();
    const {favorites, handleAddToFavorites, handleRemoveFromFavorites} = useFavorites();
    const navigate = useNavigate();
    const {trip, setTrip, updateResponse} = useReservation();

    const isFavorite = favorites.find((favorite) => favorite.id === itineraryId);

    useEffect(() => {
        const fetchItinerary = async () => {
            try {
                const itinerary = await get(`api/itineraries/${tripId}/details`)
                if(itinerary){
                    setItineraryToDisplay(itinerary);
                }
            } catch (e) {
                console.error("Cannot get itinerary : " + tripId + " " + e);
            }
        }
        fetchItinerary()
    }, []);



    const handleFavorites = () => {
        if (!token) {
            navigate("/login", {state: {from: `/trip/${itineraryId}`}});
            return;
        }
        if (isFavorite && itineraryToDisplay) {
            handleRemoveFromFavorites(itineraryToDisplay);
        } else if(itineraryToDisplay) {
            handleAddToFavorites(itineraryToDisplay);
        }
    }

    // Recherche de l'itinéraire dans le JSON local
    const itineraryImage: Image | undefined = itinerariesData.find(
        (it) => it.id === itineraryId
    );


    const handleReservation = () => {
        if(itineraryToDisplay){
            setTrip(itineraryToDisplay);
            updateResponse("userId", userId);
            updateResponse("itineraryId", itineraryToDisplay.id)
            if(token){
                updateResponse("userId", userId);
                navigate("/booking/date")
            } else{
                navigate("/login", {state: {from: "/booking/date"}});
            }
        }
    }

    const datax = dataY;

    return (
        <div>
            <Navbar/>
            {itineraryToDisplay ? (
                <>
                    <div
                        className={styles.headerContainer}
                        style={{backgroundImage: `url(${itineraryImage?.images.header})`}}
                    >
                        <div className={styles.headerContent}>
                            <h1 className={styles.headerTitle}>{itineraryToDisplay.name}</h1>
                            <hr className={styles.headerDivider}/>
                        </div>
                    </div>

                    <StickyBar/>

                    <div className={styles.actionsContainer}>
                        <div className={styles.favoriteContainer}>
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
                        <CustomButton sx={{color: "white"}} onClick={handleReservation}>
                            Book your itinerary
                        </CustomButton>
                    </div>

                    <section className={styles.itineraryDetails}>
                        <div>
                            <p>{itineraryToDisplay.shortDescription}</p>
                        </div>

                        <section className={styles.detailsGrid}>
                            <div className={styles.gridItem}>
                                <h3>Duration</h3>
                                <p>{itineraryToDisplay.totalDuration} days</p>
                            </div>
                            <div className={styles.gridItem}>
                                <h3>Accommodation</h3>
                                <p>4-Stars and 5-Stars hotels</p>
                            </div>
                            <div className={styles.gridItem}>
                                <h3>Key activities</h3>
                                <p>Hot-air balloon | Ngorongoro Crater | Coffee roasting</p>
                            </div>
                            <div className={styles.gridItem}>
                                <h3>Price guide</h3>
                                <p>{itineraryToDisplay.price} €</p>
                            </div>
                            <div className={styles.gridItemFullWidth}>
                                <h3>Visited countries</h3>
                                <p>South Africa, Kenya, Tanzania and Ouganda</p>
                            </div>
                        </section>

                        <div className={styles.activitiesSection}>
                            <h2>
                                Your all-inclusive trip, designed for an uncompromising experience. Every detail is
                                designed to offer you comfort, exclusivity and total immersion.
                            </h2>
                            <ul className={styles.activitiesList}>
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

                    <div className={styles.collage}>
                        <div className={`${styles.collageItem} ${styles.div1}`}
                             style={{backgroundImage: `url(${itineraryImage?.images.countries[0]})`}}></div>
                        <div className={`${styles.collageItem} ${styles.div2}`}
                             style={{backgroundImage: `url(${itineraryImage?.images.countries[1]})`}}></div>
                        <div className={`${styles.collageItem} ${styles.div3}`}
                             style={{backgroundImage: `url(${itineraryImage?.images.countries[2]})`}}></div>
                    </div>

                    <section className={styles.itinerarySection}>
                        <h2>Itinerary</h2>
                        <div className={styles.itineraryContent}>
                            <img src={dataY[0].images.header} className={styles.itineraryImage}/>
                            <div>
                                {itineraryToDisplay && (
                                    // Utiliser un Set pour stocker les villes déjà affichées
                                    Array.from(new Set(itineraryToDisplay.days.map((day) => day.cityName)))
                                        .map((cityName, index) => {
                                            // Trouver le premier jour correspondant à cette ville
                                            const day = itineraryToDisplay?.days.find((day) => day.cityName === cityName);
                                            return (
                                                <div key={index}>
                                                    <p className="span-country">
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

                    <section className={styles.stayDetailsSection}>
                        <div>
                            <h2>Details of your stay</h2>
                            <span></span>
                        </div>
                        {itineraryToDisplay ? (
                            itineraryToDisplay.days.map((day: Day, index) =>
                                index % 2 === 0 ? (
                                    <TripDetails day={day} image={itineraryImage?.images.days[index] || ""}/>
                                ) : (
                                    <TripDetailsReverse day={day} image={itineraryImage?.images.days[index] || ""}/>
                                )
                            )
                        ) : (
                            <p>No detail program for this itinerary.</p>
                        )}
                        <div className={styles.tripDetailsSeparator}></div>
                    </section>

                    <div className={styles.reservationButtonContainer}>
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