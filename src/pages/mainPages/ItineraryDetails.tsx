import React, {FC, useState, useEffect} from 'react';
import Navbar from "../../components/navbars/Navbar";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Carousel from "../../components/Carousel";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import {Day, ItineraryDetailsResponse} from "../../@types/ItineraryDetailsResponse";
import {useParams} from "react-router-dom";
import itinerariesData from "../../assets/itinerary.json"
import {get} from "../../../src/API/api"
import {useFavorites} from "../../contexts/MySelectionContext";
import StarIcon from '@mui/icons-material/Star';
import TripDetails from "../../components/ReusableComponents/TripDetails"
import TripDetailsReverse from "../../components/ReusableComponents/TripDetailsReverse";
import Footer from "../../components/Footer";
import "../../App.css"
import CustomButton from "../../components/ReusableComponents/CustomButton";

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
    const [itineraryToDisplay, setItineraryToDisplay] = useState<ItineraryDetailsResponse>();
    const {favorites, handleAddToFavorites, handleRemoveFromFavorites} = useFavorites();

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

    const handleClick = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({behavior: 'smooth'});

        }
    };

    const handleFavorites = () => {
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

    console.log(itineraryImage?.images.countries)

    return (
        <div>
            <Navbar/>
            {
                itineraryToDisplay ? (
                    <>
                        <div style={{
                            height: 281,
                            width: "100%",
                            backgroundImage: `url(${itineraryImage?.images.header})`,
                            display: "flex",
                            justifyContent: "flex-end",
                            alignSelf: "end"
                        }}>
                            <div style={{marginTop: "auto", marginBottom: "2rem", marginRight: "1rem"}}>
                                <h1 style={{color: "white"}}>{itineraryToDisplay.name}</h1>
                                <hr style={{
                                    marginLeft: "1rem",
                                    border: "none",
                                    borderTop: "1px solid white",
                                    width: "80%",
                                    height: "3px"
                                }}/>
                            </div>

                        </div>

                        <div className="progress-sticky-bar">
                            <ul>
                                <li onClick={() => handleClick("1")}>Day 1</li>
                                <li onClick={() => handleClick("2")}>Day 2</li>
                                <li onClick={() => handleClick("3")}>Day 3</li>
                                <li onClick={() => handleClick("4")}>Day 4</li>
                                <li onClick={() => handleClick("5")}>Day 5</li>
                                <li onClick={() => handleClick("6")}>Day 6</li>
                                <li onClick={() => handleClick("7")}>Day 7</li>
                                <li onClick={() => handleClick("8")}>Day 8</li>
                                <li onClick={() => handleClick("9")}>Day 9</li>
                                <li onClick={() => handleClick("10")}>Day 10</li>
                                <li onClick={() => handleClick("11")}>Day 11</li>
                                <li onClick={() => handleClick("12")}>Day 12</li>
                            </ul>
                        </div>

                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", margin: "2rem 1rem", gap: 35}}>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"}}>{isFavorite ? (<>
                                <StarIcon
                                    onClick={handleFavorites}/> <p>Remove from your selection</p></>) : (<> <StarBorderIcon onClick={handleFavorites}/> <p>Add to your selection</p></>)}</div>
                            <span style={{cursor:  "pointer"}}>Download the program in PDF</span>
                            <CustomButton sx={{color: "white"}}>Book your itinerary</CustomButton>
                        </div>

                        <section className="itinerary-details">
                            <div style={{textAlign: "center"}}>
                               <p>
                                    {itineraryToDisplay.shortDescription}
                                </p>
                            </div>

                            <section style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto auto auto", width: "70%", margin: "2rem auto", textAlign: "center", height: "50vh"}}>
                                <div style={{border: "1px solid black"}}>
                                    <h3>Duration</h3>
                                    <p>{itineraryToDisplay.totalDuration} days</p>
                                </div>
                                <div style={{border: "1px solid black"}}>
                                    <h3>Accommodation</h3>
                                    <p>4-Stars and 5-Stars hotels</p>
                                </div>
                                <div style={{border: "1px solid black"}}>
                                    <h3>Key activities</h3>
                                    <p>Hot-air balloon | Ngorongoro Crater | Coffee roasting</p>
                                </div>
                                <div style={{border: "1px solid black"}}>
                                    <h3>Price guide</h3>
                                    <p>{itineraryToDisplay.price} €</p>
                                </div>
                                <div style={{gridColumn: "span 2", margin: "auto", border: "1px solid black", width: "100%", height: "100%"}}>
                                    <h3>Visited countries</h3>
                                    <p>South Africa, Kenya, Tanzania and Ouganda</p>
                                </div>
                            </section>


                            <div style={{textAlign: "center"}}>
                                <h2>Your all-inclusive trip, designed for an uncompromising experience. Every detail is
                                    designed to
                                    offer you comfort, exclusivity and total immersion.
                                </h2>
                                <ul>
                                    <li>Premium transportation: Business-class flights, private transfers and
                                        personalized routes
                                        for a stress-free trip.
                                    </li>
                                    <li>
                                        Exceptional accommodations: Stay in refined lodges, 5-star hotels or private
                                        villas offering
                                        luxury and serenity.
                                    </li>
                                    <li>
                                        Exclusive activities: Private safaris, tailor-made excursions, meetings with
                                        expert guides
                                        and unique experiences close to nature.
                                    </li>
                                    <li>
                                        Refined gastronomy: dinners under the stars, exceptional wine tastings and menus
                                        designed by
                                        renowned chefs.
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/*<div>
                            <Carousel/>
                        </div>*/}

                        <div className={"collage"}>
                            <div className={"collageItem div1"} style={{backgroundImage: `url(${itineraryImage?.images.countries[0]})`}}>
                                {/*<img src={itineraryImage?.images.countries[0]} style={{objectFit: "contain", width: "100%", height: "100%"}} />*/}
                            </div>
                            <div className={"collageItem div2"} style={{backgroundImage: `url(${itineraryImage?.images.countries[1]})`}}></div>
                            <div className={"collageItem div3"} style={{backgroundImage: `url(${itineraryImage?.images.countries[2]})`}}></div>
                        </div>

                        <section>
                            <h2 style={{textAlign: "center", marginTop: "6rem", marginBottom: "6rem"}}>Itinerary</h2>
                            <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
                                <div>
                                    <img
                                        src="https://www.cartographie-georeflet.com/wp-content/uploads/2022/12/carte-de-france-administrative-vintage-des-departements-1.jpg"
                                        style={{width: "80%"}}
                                    />
                                </div>
                                <div>
                                    <div>
                                        <p className="span-country">
                                            <RoomOutlinedIcon/>
                                            South Africa
                                        </p>
                                        <p>
                                            A fascinating mix of wild landscapes, vibrant culture and extraordinary
                                            wildlife, where
                                            every day brings a new adventure.
                                        </p>
                                    </div>
                                    <div>
                                        <p className="span-country">
                                            <RoomOutlinedIcon/>
                                            Kenya
                                        </p>
                                        <p>
                                            A legendary safari destination, between the endless plains of the savannah
                                            and the
                                            paradisiacal beaches of the Indian Ocean.
                                        </p>
                                    </div>
                                    <div>
                                        <p className="span-country">
                                            <RoomOutlinedIcon/>
                                            Tanzania
                                        </p>
                                        <p>
                                            Immerse yourself in the heart of nature, with its vast savannahs and famous
                                            Serengeti
                                            safaris, as well as the majestic Kilimanjaro.
                                        </p>
                                    </div>
                                    <div>
                                        <p className="span-country">
                                            <RoomOutlinedIcon/>
                                            Ouganda
                                        </p>
                                        <p>
                                            A sanctuary for nature lovers, with lush rainforests and the chance to meet
                                            mountain
                                            gorillas.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div>
                                <h2 style={{textAlign: "center", marginTop: "6rem"}}>Details of your stay</h2>
                                <span></span>
                            </div>
                            {
                                itineraryToDisplay ? itineraryToDisplay.days.map((day : Day, index) =>
                                    index % 2 === 0 ? (<TripDetails day={day}
                                                                    image={itineraryImage?.images.days[index] || ""}/>) : (<TripDetailsReverse day={day}
                                                                                                                                               image={itineraryImage?.images.days[index] || ""}/>)
                                ) : (
                                    <p>No detail program for this itinerary.</p>
                                )
                            }

                            <div className="trip-details-separator"></div>

                            {/*<div style={{
                                borderRadius: "50%",
                                backgroundColor: "black",
                                width: 50,
                                height: 50,
                                position: "sticky",
                                bottom: 0
                            }}></div>*/}

                        </section>
                        <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center", marginBottom: "6rem"}}>
                            <CustomButton sx={{color: "white"}}>Book your itinerary</CustomButton>
                        </div>

                    </>
                ) : (
                    <p>Sorry, no itinerary found. Please try again later.</p>
                )
            }
            <Footer/>

        </div>

    );
};

export default ItineraryDetails;