import {FC, useEffect, useState} from 'react';
import {Trip} from "../../@types/Trip";
import {get} from "../../API/api";
import TripItemTravel from "../../components/ReusableComponents/TripItemTravel";
import TripItemTravelReverse from "../../components/ReusableComponents/TripItemTravelReverse";
import HeroSection from "../../components/itineraryList/HeroSection";
import SearchBar from "../../components/allTrips/SearchBar";
import Footer from "../../components/ReusableComponents/Footer";
import Sort from "../../components/allTrips/Sort";
import styles from "../../styles/TripListPage.module.css";
import Pages from "../../components/layout/Pages";

interface TripExtended extends Trip {
    themeId: number;
    themeName: string;
}

type Theme = {
    themeId: number;
    themeName: string;
};

type HeaderMap = Record<number, string>;

const ItineraryListPage: FC = () => {
    const [trips, setTrips] = useState<TripExtended[]>([]);
    const [filteredTrips, setFilteredTrips] = useState<TripExtended[]>([]);
    const [themes, setThemes] = useState<Theme[]>([]);
    const [headerMap, setHeaderMap] = useState<HeaderMap>({});

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    const sortOptions = [
        {id: "option 1", label: "None"},
        {id: "option 2", label: "Descending price"},
        {id: "option 3", label: "Ascending price"}
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
                    setTrips(itinerariesResponse.data);
                    setFilteredTrips(itinerariesResponse.data);

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

    useEffect(() => {
        const loadHeaders = async () => {
            const map: HeaderMap = {};
            await Promise.all(
                filteredTrips.map(async trip => {
                    try {
                        const roles = await get<string[]>(`/api/itinerary-images/${trip.id}`) ?? [];
                        if (!roles.includes("firstHeader")) return;
                        const res = await fetch(`/api/itinerary-images/${trip.id}/firstHeader`);
                        if (!res.ok) return;
                        const blob = await res.blob();
                        map[trip.id] = URL.createObjectURL(blob);
                    } catch {

                    }
                })
            );
            setHeaderMap(map);
        };

        loadHeaders();

        return () => {
            Object.values(headerMap).forEach(URL.revokeObjectURL);
        };
    }, [filteredTrips]);

    const handleThemeChange = (selectedOption: string) => {
        console.log("Filtre thème sélectionné :", selectedOption);
        setSelectedTheme(selectedOption);
    };

    const handleSort = (selectedOption: string) => {
        console.log("Tri sélectionné :", selectedOption);
        setSelectedSort(selectedOption);
    };



    return (
        <>
            <Pages title="Our itineraries - Odyssea">
            </Pages>

            <HeroSection/>
            <SearchBar/>
            <section className={styles.sortList}>
                <Sort
                    title="Themes"
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
                        <TripItemTravel
                            key={trip.id}
                            trip={trip}
                            headerImage={headerMap[trip.id] || ''}
                        />
                    ) : (
                        <TripItemTravelReverse
                            key={trip.id}
                            trip={trip}
                            headerImage={headerMap[trip.id] || ''}
                        />
                    )
                )
            ) : (
                <p>No trips found</p>
            )}
        </>
    );
};

export default ItineraryListPage;
