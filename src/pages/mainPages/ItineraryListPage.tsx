import {FC, JSX, useEffect, useState} from 'react';
import {Trip} from "../../@types/Trip";
import {get} from "../../API/api";
import TripItemTravel from "../../components/ReusableComponents/TripItemTravel";
import TripItemTravelReverse from "../../components/ReusableComponents/TripItemTravelReverse";
import Navbar from "../../components/navbars/Navbar";
import HeroSection from "../../components/HeroSection";
import SearchBar from "../../components/SearchBar";
import Footer from "../../components/Footer";
import  Sort from "../../components/Sort";
import styles from "../../styles/TripListPage.module.css"
import {Country} from "../../@types/Country";
import {imageData} from "../../assets/image"


const ItineraryListPage: ({}: {}) => JSX.Element = ({}) => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [themes, setThemes] = useState<any>([]);
    const duration = [{id: "3weeks", label: "3 weeks"}, {id: "4weeks", label: "4 weeks"}];
    const sortOptions = [{id: "option 1", label: "Aucun"}, {id: "option 2", label: "Prix décroissant"}, {
        id: "option 3",
        label: "Prix croissant"
    } ]

    // Récupérer les itinéraires, les pays et les thèmes
    useEffect(() => {
        const fetchTripsCountriesThemes = async () => {
            try {
                // Récupérer les données depuis le backend
                const tripsToFetch = await get("/api/itineraries/themes");
                const countriesToFetch = await get("/countries");
                const themesToFetch = await get("/api/themes");

                // Vérifier si les données sont bien récupérées
                if (tripsToFetch && countriesToFetch && themesToFetch) {
                    setTrips(tripsToFetch);
                    setCountries(countriesToFetch);
                    setThemes(themesToFetch);
                }
            } catch (e) {
                console.error("Erreur lors de la récupération des données:", e);
            }
        };

        fetchTripsCountriesThemes();
    }, []);

    //TODO: Filtre pays
    const handleCountryChange = (selectedOption: string) => {
        console.log("Option sélectionnée :", selectedOption);
    };

    //TODO: Filtre thèmes
    const handleThemeChange = (selectedOption: string) => {
        console.log("Option sélectionnée :", selectedOption);
    };

    //TODO: Filtre durée
    const handleDurationChange = (selectedOption: string) => {
        console.log("Option sélectionnée :", selectedOption);
    };

    //TODO: Trier
    const handleSort = (selectedOption: string) => {
        console.log("Option sélectionnée :", selectedOption);
    };

    const getHeaderImage = (tripId: number) => {
        const imageSet = imageData.find((data) => data.id === tripId);
        return imageSet ? imageSet.images.header[0] : '' // Retourne la première image d'en-tête
    };

    return (
        <>
            <HeroSection/>
            <SearchBar/>
            <section className={styles.sortList}>
                <Sort
                    title="Destinations"
                    options={countries.map((country) => ({id: country.id.toString(), label: country.name}))}
                    onChange={handleCountryChange}
                />
                <Sort title={"Thèmes"} options={themes} onChange={handleThemeChange}/>
                <Sort title={"Durée"} options={duration} onChange={handleDurationChange}/>
                <Sort title={"Trier"} options={sortOptions} onChange={handleSort}/>
            </section>

            {/* Afficher les voyages */}
            {trips.length > 0 && trips.map((trip: Trip, index: number) => (
                index % 2 === 0 ? (
                    <TripItemTravel key={trip.id} trip={trip} headerImage={getHeaderImage(trip.id)}/>
                ) : (
                    <TripItemTravelReverse key={trip.id} trip={trip} headerImage={getHeaderImage(trip.id)}/>
                )
            ))}

            <Footer/>
        </>
    );
};

export default ItineraryListPage;
