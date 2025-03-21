import {FC} from 'react';
import React, {useState, useEffect} from 'react';
import Navbar from "../../components/navbars/Navbar";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Carousel from "../../components/Carousel";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import TripDetails from "../../components/ReusableComponents/TripDetails";

const ItineraryDetails: FC<{}> = ({}) => {

    return (
        <div>
            <Navbar/>

            <div>
                <img/>
                <div>
                    <h1>Exceptional Safari: Meet the Giants of Africa</h1>
                    <span>Download the program in PDF</span>
                </div>
            </div>

            <div className="progress-sticky-bar">
                <ul>
                </ul>
            </div>

            <div>
                <StarBorderIcon/>
                <p></p>
            </div>

            <section className="itinerary-details">
                <div>
                    <h2>Luxury, adventure and wildlife: experience an unforgettable safari.</h2>
                    <p>
                        Experience the thrill of a luxury safari in the heart of the wilderness, where the immensity of
                        the
                        African landscape blends with the elegance of an exclusive journey. Stay in refined lodges in
                        the
                        heart of the savannah, wake up to the sound of nature and set off on a private safari at first
                        light
                        to observe majestic lions, imposing elephants and stealthy leopards in their natural habitat.
                        After
                        a day rich in discovery, enjoy a gourmet dinner under a starry sky, lulled by the distant songs
                        of
                        the animals. An unforgettable experience, combining the thrill of adventure with absolute
                        comfort.
                    </p>
                </div>


                <div>
                    <h3>Duration</h3>
                    <p>20 days</p>
                </div>
                <div>
                    <h3>Accommodation</h3>
                    <p>4-Stars hotel</p>
                </div>
                <div>
                    <h3>Key activities</h3>
                    <p>Hot-air balloon | Ngorongoro Crater | Coffee roasting</p>
                </div>
                <div>
                    <h3>Price guide</h3>
                    <p>9.000$ per person</p>
                </div>
                <div>
                    <h3>Visited countries</h3>
                    <p>South Africa, Kenya, Tanzania and Ouganda</p>
                </div>


                <div>
                    <h2>Your all-inclusive trip, designed for an uncompromising experience. Every detail is designed to offer you comfort, exclusivity and total immersion.
                    </h2>
                    <ul>
                        <li>Premium transportation: Business-class flights, private transfers and personalized routes for a stress-free trip.
                        </li>
                        <li>
                            Exceptional accommodations: Stay in refined lodges, 5-star hotels or private villas offering luxury and serenity.
                        </li>
                        <li>
                            Exclusive activities: Private safaris, tailor-made excursions, meetings with expert guides and unique experiences close to nature.
                        </li>
                        <li>
                            Refined gastronomy: dinners under the stars, exceptional wine tastings and menus designed by renowned chefs.
                        </li>
                    </ul>
                </div>
            </section>

            <div>
                <Carousel/>
            </div>

            <section>
                <h2>Itinerary</h2>
                <div>
                    <div>
                        <img src="https://www.cartographie-georeflet.com/wp-content/uploads/2022/12/carte-de-france-administrative-vintage-des-departements-1.jpg"
                             style={{width: "100%"}}
                        />
                    </div>
                    <div>
                        <div>
                            <p className="span-country">
                                <RoomOutlinedIcon/>
                                South Africa
                            </p>
                            <p>
                                A fascinating mix of wild landscapes, vibrant culture and extraordinary wildlife, where every day brings a new adventure.
                            </p>
                        </div>
                        <div>
                            <p className="span-country">
                                <RoomOutlinedIcon/>
                                Kenya
                            </p>
                            <p>
                                A legendary safari destination, between the endless plains of the savannah and the paradisiacal beaches of the Indian Ocean.
                            </p>
                        </div>
                        <div>
                            <p className="span-country">
                                <RoomOutlinedIcon/>
                                Tanzania
                            </p>
                            <p>
                                Immerse yourself in the heart of nature, with its vast savannahs and famous Serengeti safaris, as well as the majestic Kilimanjaro.
                            </p>
                        </div>
                        <div>
                            <p className="span-country">
                                <RoomOutlinedIcon/>
                                Ouganda
                            </p>
                            <p>
                                A sanctuary for nature lovers, with lush rainforests and the chance to meet mountain gorillas.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div>
                    <h2>Details of your stay</h2>
                    <span></span>
                </div>

                <TripDetails/>

                <div className="trip-details-separator"></div>

            </section>

        </div>
    );
};

export default ItineraryDetails;


{/*
import React, { useState, useEffect } from 'react';

const TripDetails = ({ country }) => (
  <div>{`Détails pour le pays: ${country}`}</div>
);

const TripDetailsReverse = ({ country }) => (
  <div>{`Détails inversés pour le pays: ${country}`}</div>
);

const DisplayTripDetails = ({ countries }) => {
  const [index, setIndex] = useState(0);

  // Lorsque l'index change, alterner entre les deux composants
  useEffect(() => {
    if (index < countries.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, 2000); // délai de 2 secondes entre les affichages

      return () => clearTimeout(timer); // nettoyage du timer
    }
  }, [index, countries.length]);

  // Logique pour alterner entre TripDetails et TripDetailsReverse
  const isTripDetails = index % 2 === 0;

  if (index >= countries.length) {
    return null; // Si on a affiché tous les pays, on arrête d'afficher
  }

  const country = countries[index];
  return (
    <div>
      {isTripDetails ? (
        <TripDetails country={country} />
      ) : (
        <TripDetailsReverse country={country} />
      )}
    </div>
  );
};

// Exemple d'utilisation du composant DisplayTripDetails
const countries = ['France', 'Espagne', 'Italie', 'Allemagne'];

const App = () => {
  return <DisplayTripDetails countries={countries} />;
};

export default App;
*/}