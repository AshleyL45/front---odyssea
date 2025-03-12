import {FC, JSX, useEffect, useState} from 'react';
import {Trip} from "../../@types/Trip";
import {get} from "../../API/api";
import TripItemTravel from "../../components/ReusableComponents/TripItemTravel";
import TripItemTravelReverse from "../../components/ReusableComponents/TripItemTravelReverse";
import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import SearchBar from "../../components/SearchBar";
import Footer from "../../components/Footer";
import  Sort from "../../components/Sort";
import styles from "../../styles/TripListPage.module.css"
import {Country} from "../../@types/Country";


const ItineraryListPage: ({}: {}) => JSX.Element = ({}) => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [themes, setThemes] = useState([]);
    const duration = [{id: "3weeks", label: "3 weeks"}, {id: "4weeks", label: "4 weeks"}];
    const sortOptions = [{id: "option 1", label: "Aucun"}, {id: "option 2", label: "Prix décroissant"}, {
        id: "option 3",
        label: "Prix croissant"
    } ]

    // Récupérer les itinéraires, les pays et les thèmes
    useEffect(() => {
        const fetchTripsCountriesThemes = async () => {
            try {
                const tripsToFetch = await get("/api/itineraries");
                const countriesToFetch = await get("/countries");
                const themesToFetch = await get("/api/themes");
                if(tripsToFetch && countriesToFetch && themesToFetch) {
                    setTrips(tripsToFetch);
                    setCountries(countriesToFetch);
                    setThemes(themesToFetch);
                }
            } catch (e) {
                console.error(e);
            }
        }
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

            {
                trips.length && trips.map((trip: Trip, index: number) => {
                    index % 2 === 0 ? <TripItemTravel/> : <TripItemTravelReverse/>
                })
            }

            <Footer/>
        </>
    );
};

export default ItineraryListPage;
