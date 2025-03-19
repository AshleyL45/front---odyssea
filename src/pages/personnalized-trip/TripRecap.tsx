import {FC, JSX, useEffect, useRef, useState} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import "../../App.css";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import InteractiveMap, {MarkerData} from "../../components/InteractiveMap";


const TripRecap: () => JSX.Element = () => {
        const [markersData, setMarkersData] = useState<MarkerData[]>([]);
        const [activeCenter, setActiveCenter] = useState<[number, number]>([48.8566, 2.3522]);
        const dayRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

        // Fetch des données de l'itinéraire
        useEffect(() => {
            fetch('http://localhost:8080/api/interactive-map')
                .then(response => response.json())
                .then((data: MarkerData[]) => {
                    console.log("Données reçues de l'API :", data);
                    setMarkersData(data);
                    // Si les données contiennent un jour 1, on l'utilise par défaut
                    const day1 = data.find(m => m.dayNumber === 1);
                    if (day1) {
                        setActiveCenter([day1.latitude, day1.longitude]);
                    }
                })
                .catch(error => console.error('Erreur lors de la récupération des données:', error));
        }, []);

        // IntersectionObserver pour détecter quel jour est visible
        useEffect(() => {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.5
            };

            const observerCallback: IntersectionObserverCallback = (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const day = Number(entry.target.getAttribute('data-day'));
                        // Cherche le marqueur correspondant dans markersData
                        const marker = markersData.find(m => m.dayNumber === day);
                        if (marker) {
                            setActiveCenter([marker.latitude, marker.longitude]);
                        }
                    }
                });
            };

            const observer = new IntersectionObserver(observerCallback, observerOptions);
            Object.values(dayRefs.current).forEach(ref => {
                if (ref) observer.observe(ref);
            });

            return () => observer.disconnect();
        }, [markersData]);


        return (
        <div>
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

            <a style={{display: 'flex', alignItems: "center", fontSize: "16px", margin: "10px 40px"}} href="#">
                <ArrowBackIcon sx={{fontSize: "15px"}}/>
                previous step
            </a>

            <div style={{width: "80%", margin: "auto"}}>
                <h1 style={{fontSize: "25px", margin: "50px 0 30px", textAlign: "center"}}>
                    Summary of your trip
                </h1>

                <form style={{display: "flex", flexDirection: "column"}}>
                    <label style={{textAlign: "center", margin: "20px 0"}}>
                        Your trip name :
                    </label>
                    <input
                        className="input-user-trip"
                        type="text"
                        id="name-user-trip"
                        name="name-user-trip"
                        required
                        placeholder="Enter the name ..."
                    />
                </form>

                <div className="recap-trip">
                    <div
                        className="container-map"
                    >
                        <InteractiveMap markersData={markersData} center={activeCenter}/>
                    </div>

                    <div>
                        <div className="country-step">
                            <h2>Pologne</h2>
                            <div className="day-step">
                                <p className="day-number">
                                    <LocationOnOutlinedIcon/>
                                    Jour 1
                                </p>
                                <p>
                                    <span>Transfert</span> : Chauffeur privé jusqu'à l'hôtel.
                                </p>
                                <p>
                                    <span>Hôtel</span> : Raffles Europejski Warsaw
                                </p>
                                <ul>
                                    <li>
                                        Situé en plein cœur de Varsovie, ce palace historique mêle élégance classique et
                                        design contemporain.
                                    </li>
                                    <li>
                                        Spa de luxe, restaurant gastronomique et chambres avec vue sur la vieille ville.
                                    </li>
                                </ul>
                                <p>
                                    Soirée libre pour se reposer et explorer les environs.
                                </p>
                            </div>

                            <div className="day-step">
                                <p className="day-number">
                                    <LocationOnOutlinedIcon/>
                                    Jour 2
                                </p>
                                <p>
                                    <span>Petit-déjeuner à l'hôtel</span>
                                </p>
                                <div>
                                    <span>Musée de l’Insurrection de Varsovie (2h)</span>
                                    <ul>
                                        <li>
                                            Un musée immersif retraçant l’histoire bouleversante de la révolte contre
                                            l’occupation nazie en 1944.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="day-step">
                                <p className="day-number">
                                    <LocationOnOutlinedIcon/>
                                    Jour 3
                                </p>
                                <p>
                                    <span>Train Varsovie → Cracovie (8h00 - 10h30) en première classe.</span>
                                </p>
                                <p>
                                    <span>Hôtel</span> : Hotel Stary
                                </p>
                                <ul>
                                    <li>
                                        Un boutique-hôtel 5 étoiles dans un bâtiment historique avec une piscine
                                        souterraine et un rooftop offrant une vue magnifique sur la ville.
                                    </li>
                                </ul>
                                <p>
                                    <span>Visite du château de Wawel et sa cathédrale (2h)</span>
                                </p>
                                <ul>
                                    <li>
                                        Résidence des rois de Pologne avec une architecture fascinante.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="country-step">
                            <h2>Japon</h2>
                            <div className="day-step">
                                <p className="day-number">
                                    <LocationOnOutlinedIcon/>
                                    Jour 1
                                </p>
                                <p>
                                    <span>Transfert</span> : Chauffeur privé jusqu'à l'hôtel.
                                </p>
                                <p>
                                    <span>Hôtel</span> : Raffles Europejski Warsaw
                                </p>
                                <ul>
                                    <li>
                                        Situé en plein cœur de Varsovie, ce palace historique mêle élégance classique et
                                        design contemporain.
                                    </li>
                                    <li>
                                        Spa de luxe, restaurant gastronomique et chambres avec vue sur la vieille ville.
                                    </li>
                                </ul>
                                <p>
                                    Soirée libre pour se reposer et explorer les environs.
                                </p>
                            </div>

                            <div className="day-step">
                                <p className="day-number">
                                    <LocationOnOutlinedIcon/>
                                    Jour 2
                                </p>
                                <p>
                                    <span>Petit-déjeuner à l'hôtel</span>
                                </p>
                                <div>
                                    <span>Musée de l’Insurrection de Varsovie (2h)</span>
                                    <ul>
                                        <li>
                                            Un musée immersif retraçant l’histoire bouleversante de la révolte contre
                                            l’occupation nazie en 1944.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="day-step">
                                <p className="day-number">
                                    <LocationOnOutlinedIcon/>
                                    Jour 3
                                </p>
                                <p>
                                    <span>Train Varsovie → Cracovie (8h00 - 10h30) en première classe.</span>
                                </p>
                                <p>
                                    <span>Hôtel</span> : Hotel Stary
                                </p>
                                <ul>
                                    <li>
                                        Un boutique-hôtel 5 étoiles dans un bâtiment historique avec une piscine
                                        souterraine et un rooftop offrant une vue magnifique sur la ville.
                                    </li>
                                </ul>
                                <p>
                                    <span>Visite du château de Wawel et sa cathédrale (2h)</span>
                                </p>
                                <ul>
                                    <li>
                                        Résidence des rois de Pologne avec une architecture fascinante.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="country-step">
                            <h2>Islande</h2>
                            <div className="day-step">
                                <p className="day-number">
                                    <LocationOnOutlinedIcon/>
                                    Jour 1
                                </p>
                                <p>
                                    <span>Transfert</span> : Chauffeur privé jusqu'à l'hôtel.
                                </p>
                                <p>
                                    <span>Hôtel</span> : Raffles Europejski Warsaw
                                </p>
                                <ul>
                                    <li>
                                        Situé en plein cœur de Varsovie, ce palace historique mêle élégance classique et
                                        design contemporain.
                                    </li>
                                    <li>
                                        Spa de luxe, restaurant gastronomique et chambres avec vue sur la vieille ville.
                                    </li>
                                </ul>
                                <p>
                                    Soirée libre pour se reposer et explorer les environs.
                                </p>
                            </div>

                            <div className="day-step">
                                <p className="day-number">
                                    <LocationOnOutlinedIcon/>
                                    Jour 2
                                </p>
                                <p>
                                    <span>Petit-déjeuner à l'hôtel</span>
                                </p>
                                <div>
                                    <span>Musée de l’Insurrection de Varsovie (2h)</span>
                                    <ul>
                                        <li>
                                            Un musée immersif retraçant l’histoire bouleversante de la révolte contre
                                            l’occupation nazie en 1944.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="day-step">
                                <p className="day-number">
                                    <LocationOnOutlinedIcon/>
                                    Jour 3
                                </p>
                                <p>
                                    <span>Train Varsovie → Cracovie (8h00 - 10h30) en première classe.</span>
                                </p>
                                <p>
                                    <span>Hôtel</span> : Hotel Stary
                                </p>
                                <ul>
                                    <li>
                                        Un boutique-hôtel 5 étoiles dans un bâtiment historique avec une piscine
                                        souterraine et un rooftop offrant une vue magnifique sur la ville.
                                    </li>
                                </ul>
                                <p>
                                    <span>Visite du château de Wawel et sa cathédrale (2h)</span>
                                </p>
                                <ul>
                                    <li>
                                        Résidence des rois de Pologne avec une architecture fascinante.
                                    </li>
                                </ul>
                            </div>
                        </div>
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
                <CustomButton style={{width: "130px", marginTop: "70px"}} variant="contained">
                    Submit
                </CustomButton>
            </div>
        </div>
    );
};

export default TripRecap;
