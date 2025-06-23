import {FC, useState} from 'react';
import TripItemTravel from "../../components/ReusableComponents/TripItemTravel";
import TripItemTravelReverse from "../../components/ReusableComponents/TripItemTravelReverse";
import HeroSection from "../../components/itineraryList/HeroSection";
import Sort from "../../components/allTrips/Sort";
import styles from "../../styles/TripListPage.module.css";
import Pages from "../../components/layout/Pages";
import { useItineraries } from '../../hooks/itineraryListPage/useItineraries';
import {useFilteredTrips} from "../../hooks/itineraryListPage/useFilteredTrips";
import {useItineraryHeaderImage} from "../../hooks/itineraryListPage/useItineraryHeaderImage";


const ItineraryListPage: FC = () => {
    const [selectedTheme, setSelectedTheme] = useState<string>("");
    const [selectedSort, setSelectedSort] = useState<string>("option 1");

    const {trips, themes} = useItineraries(selectedTheme, selectedSort);
    const filteredTrips = useFilteredTrips(trips, selectedTheme, selectedSort);
    const headerMap = useItineraryHeaderImage(filteredTrips);


    const sortOptions = [
        {id: "option 1", label: "None"},
        {id: "option 2", label: "Descending price"},
        {id: "option 3", label: "Ascending price"}
    ];


    const handleThemeChange = (selectedOption: string) => {
        setSelectedTheme(selectedOption);
    };

    const handleSort = (selectedOption: string) => {
        setSelectedSort(selectedOption);
    };

    return (
        <>
            <Pages title="Our itineraries - Odyssea">
            </Pages>

            <HeroSection/>
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
