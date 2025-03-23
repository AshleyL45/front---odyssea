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

// On étend l'interface Trip pour y ajouter les champs themeId et themeName
interface TripExtended extends Trip {
    themeId: number;       // issu de ItineraryThemes
    themeName: string;     // issu de ItineraryThemes
}

// Type pour un thème renvoyé par l'API /api/themes
type Theme = {
    themeId: number;
    themeName: string;
};

const ItineraryListPage: FC = () => {
    // Les itinéraires récupérés contiennent déjà themeId et themeName
    const [trips, setTrips] = useState<TripExtended[]>([]);
    const [filteredTrips, setFilteredTrips] = useState<TripExtended[]>([]);
    const [themes, setThemes] = useState<Theme[]>([]);

    const sortOptions = [
        {id: "option 1", label: "Aucun"},
        {id: "option 2", label: "Prix décroissant"},
        {id: "option 3", label: "Prix croissant"}
    ];

    // Ordre souhaité des thèmes (les chaînes doivent correspondre exactement à themeName)
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

    const [selectedTheme, setSelectedTheme] = useState<string>("");
    const [selectedSort, setSelectedSort] = useState<string>("option 1");

    // Récupération des itinéraires (via /api/itineraries/themes) et des thèmes (via /api/themes)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const itinerariesResponse = await get("/api/itineraries/themes");
                const themesResponse = await get("/api/themes");

                console.log("Itinéraires API :", itinerariesResponse);
                console.log("Thèmes API :", themesResponse);

                if (itinerariesResponse && themesResponse) {
                    // Les itinéraires sont des objets possédant themeId et themeName
                    setTrips(itinerariesResponse);
                    setFilteredTrips(itinerariesResponse);

                    const fetchedThemes = themesResponse as Theme[];
                    // Tri des thèmes selon l'ordre souhaité
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

    // Filtrage et tri des itinéraires
    useEffect(() => {
        let filtered = [...trips];

        // Filtrage par thème (on compare le themeId de l'itinéraire avec la valeur sélectionnée)
        if (selectedTheme) {
            console.log("Filtrage par thème avec selectedTheme =", selectedTheme);
            filtered = filtered.filter((itinerary) => {
                // On vérifie que l'itinéraire possède un themeId
                return itinerary.themeId && itinerary.themeId.toString() === selectedTheme;
            });
        }

        // Tri par prix
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

    const handleResetFilters = () => {
        setSelectedTheme("");
        setSelectedSort("option 1");
    };

    const getHeaderImage = (tripId: number) => {
        const imageSet = imageData.find((data) => data.id === tripId);
        return imageSet ? imageSet.images.header[0] : '';
    };

    return (
        <>
            <HeroSection/>
            <SearchBar/>
            <section className={styles.sortList}>
                <Sort
                    title="Thèmes"
                    options={themes.map((theme) => ({
                        id: theme.themeId.toString(),
                        label: theme.themeName
                    }))}
                    onChange={handleThemeChange}
                />
                <Sort
                    title="Trier"
                    options={sortOptions}
                    onChange={handleSort}
                />
                <button onClick={handleResetFilters} className={styles.resetButton}>
                    Réinitialiser les filtres
                </button>
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
