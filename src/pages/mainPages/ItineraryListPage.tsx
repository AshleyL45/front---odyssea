import {FC, useEffect, useState} from 'react';
import {Trip} from "../../@types/Trip";
import {get} from "../../API/api";
import TripItemTravel from "../../components/ReusableComponents/TripItemTravel";
import TripItemTravelReverse from "../../components/ReusableComponents/TripItemTravelReverse";
import HeroSection from "../../components/HeroSection";
import SearchBar from "../../components/SearchBar";
import Footer from "../../components/Footer";
import Sort from "../../components/Sort";
import styles from "../../styles/TripListPage.module.css";
import {imageData} from "../../assets/image";
import Pages from "../../components/layout/Pages";

interface TripExtended extends Trip {
    themeId: number;
    themeName: string;
}

type Theme = {
    themeId: number;
    themeName: string;
};

const ItineraryListPage: FC = () => {
    const [trips, setTrips] = useState<TripExtended[]>([]);
    const [filteredTrips, setFilteredTrips] = useState<TripExtended[]>([]);
    const [themes, setThemes] = useState<Theme[]>([]);

    const sortOptions = [
        {id: "option 1", label: "Aucun"},
        {id: "option 2", label: "Prix décroissant"},
        {id: "option 3", label: "Prix croissant"}
    ];

    const themeOrder = [
        "Between Girls",
        "Guided Tour",
        "Luxury Safari",
        "Honeymoon",
        "Family Trip",
        "Wellness Retreat",
        "Luxury Camping",
        "Christmas Getaway",
        "Business Trip",
        "Extreme Adventure"
    ];

    // "All" (représenté par une chaîne vide) pour afficher tous les itinéraires
    const [selectedTheme, setSelectedTheme] = useState<string>("");
    const [selectedSort, setSelectedSort] = useState<string>("option 1");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const itinerariesResponse = await get("/api/itineraries/themes");
                const themesResponse = await get("/api/themes");

                console.log("Itinéraires API :", itinerariesResponse);
                console.log("Thèmes API :", themesResponse);

                if (itinerariesResponse && themesResponse) {
                    setTrips(itinerariesResponse);
                    setFilteredTrips(itinerariesResponse);

                    const fetchedThemes = themesResponse as Theme[];
                    const sortedThemes = fetchedThemes.sort((a, b) => {
                        return themeOrder.indexOf(a.themeName) - themeOrder.indexOf(b.themeName);
                    });
                    setThemes(sortedThemes);
                    console.log("Thèmes triés :", sortedThemes);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let filtered = [...trips];

        if (selectedTheme) {
            console.log("Filtrage par thème avec selectedTheme =", selectedTheme);
            filtered = filtered.filter((itinerary) => {
                return itinerary.themeId.toString() === selectedTheme;
            });
        }

        if (selectedSort === "option 2") {
            filtered.sort((a, b) => b.price - a.price);
        } else if (selectedSort === "option 3") {
            filtered.sort((a, b) => a.price - b.price);
        }

        console.log("Itinéraires filtrés :", filtered);
        setFilteredTrips(filtered);
    }, [trips, selectedTheme, selectedSort]);

    const handleThemeChange = (selectedOption: string) => {
        console.log("Filtre thème sélectionné :", selectedOption);
        setSelectedTheme(selectedOption);
    };

    const handleSort = (selectedOption: string) => {
        console.log("Tri sélectionné :", selectedOption);
        setSelectedSort(selectedOption);
    };

    const getHeaderImage = (tripId: number) => {
        const imageSet = imageData.find((data) => data.id === tripId);
        return imageSet ? imageSet.images.header[0] : '';
    };

    return (
        <>
            <Pages title="Our itineraries - Odyssea">
            </Pages>

            <HeroSection/>
            <SearchBar/>
            <section className={styles.sortList}>
                <Sort
                    title="Thèmes"
                    options={[
                        {id: "", label: "All"},
                        ...themes.map((theme) => ({
                            id: theme.themeId.toString(),
                            label: theme.themeName
                        }))
                    ]}
                    onChange={handleThemeChange}
                />
                <Sort
                    title="Sort"
                    options={sortOptions}
                    onChange={handleSort}
                />
            </section>

            {filteredTrips.length > 0 ? (
                filteredTrips.map((trip, index) =>
                    index % 2 === 0 ? (
                        <TripItemTravel key={trip.id} trip={trip} headerImage={getHeaderImage(trip.id)}/>
                    ) : (
                        <TripItemTravelReverse key={trip.id} trip={trip} headerImage={getHeaderImage(trip.id)}/>
                    )
                )
            ) : (
                <p>Aucun voyage trouvé</p>
            )}

            <Footer/>
        </>
    );
};

export default ItineraryListPage;
