import {FC, useState} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../../App.css"
import CustomButton from "../../components/ReusableComponents/CustomButton";
import {useNavigate} from "react-router-dom";
import RecapFirstDay from "../../components/recapTrip/RecapFirstDay";
import RecapActivityDay from "../../components/recapTrip/RecapActivityDay";
import RecapTransfertDay from "../../components/recapTrip/RecapTransfertDay";
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";
import {CountrySelection, Option, PersonalizeTrip} from "../../@types/PersonalizeTrip";

const TripRecap: FC = () => {

    const [itineraryName, setItineraryName] = useState<string>(''); // Déclaration de l'état
    const [userId, setUserId] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>('');
    const [departureCity, setDepartureCity] = useState<string>('');
    const [countrySelection, setCountrySelection] = useState<CountrySelection[]>([]);
    const [numberOfAdults, setNumberOfAdults] = useState<number>(0);
    const [numberOfKids, setNumberOfKids] = useState<number>(0);
    const [hotelStanding, setHotelStanding] = useState<number>(0);
    const [options, setOptions] = useState<Option[]>([]); // Remplacer Option par le bon type si nécessaire
    const navigate = useNavigate();

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Empêcher le rechargement de la page

        // Création de l'objet PersonalizeTrip
        const tripData: PersonalizeTrip = {
            userId,
            startDate,
            departureCity,
            countrySelection,
            numberOfAdults,
            numberOfKids,
            hotelStanding,
            options,
            itineraryName, // Ajoutez ici le nom de l'itinéraire récupéré
        };

        // Envoi de l'objet au backend avec fetch
        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tripData),
            });

            if (response.ok) {
                // Traitement après la soumission réussie
                alert('Trip submitted successfully');
                navigate('/confirmation'); // Redirige vers une page de confirmation (à ajuster)
            } else {
                // Gérer les erreurs de soumission
                alert('Failed to submit trip');
            }
        } catch (error) {
            console.error('Error submitting the trip:', error);
            alert('An error occurred while submitting the trip');
        }
    };

    console.log()

    return (
        <div>
            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{width: "100%", height: "6px", backgroundColor: "#2C3E50", position: "relative", top: "-5px"}}></div>
            </div>

            <a href="#"
               style={{display: 'flex', alignItems: "center", fontSize: "16px", margin: "10px 40px", cursor: "pointer"}}
               onClick={() => navigate(-1)}>
                <ArrowBackIcon sx={{fontSize: "15px"}}/>
                previous step
            </a>

            <div style={{width: "80%", margin: "auto"}}>

                <h1 style={{fontSize: "25px", margin: "50px 0 30px", textAlign: "center"}}>Summary of your trip</h1>

                <form style={{display: "flex", flexDirection: "column"}}>
                <label style={{textAlign: "center", margin: "20px 0"}}>Your trip name :</label>
                    <input
                        className="input-user-trip"
                        type="text"
                        id="name-user-trip"
                        name="name-user-trip"
                        required
                        placeholder="Enter the name ..."
                        value={itineraryName}
                        onChange={(e) => setItineraryName(e.target.value)} // Mettre à jour l'état à chaque changement
                    />
                </form>

                <div className="recap-trip">
                    <div className="container-map">
                        <img
                            src="https://www.cartographie-georeflet.com/wp-content/uploads/2022/12/carte-de-france-administrative-vintage-des-departements-1.jpg"
                            alt="france map"
                            className="map"
                            />
                    </div>

                    <div>
                        <div className="country-step">
                            <h2>Pologne</h2>

                            <RecapFirstDay/>
                            <RecapActivityDay/>
                            <RecapTransfertDay/>

                        </div>

                        <div className="country-step">
                            <h2>Japon</h2>

                            <RecapFirstDay/>
                            <RecapActivityDay/>
                            <RecapTransfertDay/>

                        </div>

                        <div className="country-step">
                            <h2>Islande</h2>

                            <RecapFirstDay/>
                            <RecapActivityDay/>
                            <RecapTransfertDay/>

                        </div>
                    </div>
                </div>
            </div>

            <div className="line-recap"></div>

            <div className="submit" style={{textAlign:"center", margin: "100px auto 50px"}}>
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
                >
                    Submit
                </CustomButton>
            </div>
        </div>
    );
};

export default TripRecap;