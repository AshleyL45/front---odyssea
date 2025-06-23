import {useState, useEffect} from 'react';
import {get} from '../../API/api';
import {Trip} from '../../@types/Trip';

export interface TripExtended extends Trip {
    themeId: number;
    themeName: string;
}

export type Theme = {
    themeId: number;
    themeName: string;
};

const themeOrder = [
    'Between Girls',
    'Guided Tour',
    'Luxury Safari',
    'Honeymoon',
    'Family Trip',
    'Wellness Retreat',
    'Luxury Camping',
    'Christmas Getaway',
    'Business Trip',
    'Extreme Adventure'
];



export function useItineraries(
    selectedTheme: string,
    selectedSort: string
) {
    const [trips, setTrips] = useState<TripExtended[]>([]);
    const [filteredTrips, setFilteredTrips] = useState<TripExtended[]>([]);
    const [themes, setThemes] = useState<Theme[]>([]);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});

        async function fetchData() {
            try {
                const itinsResp = await get('/api/itineraries');
                const tripsData: TripExtended[] = itinsResp.data;
                setTrips(tripsData);
                setFilteredTrips(tripsData);

                const themesResp = await get('/api/themes');
                const fetchedThemes: Theme[] = themesResp.data;
                const sortedThemes = fetchedThemes.sort(
                    (a, b) =>
                        themeOrder.indexOf(a.themeName) -
                        themeOrder.indexOf(b.themeName)
                );
                setThemes(sortedThemes);
            } catch (err) {
                console.error('useItineraries error:', err);
            }
        }

        fetchData();
    }, []);


    useEffect(() => {
        let result = [...trips];

        if (selectedTheme) {
            result = result.filter(
                itin => itin.themeId.toString() === selectedTheme
            );
        }

        if (selectedSort === 'option 2') {
            result.sort((a, b) => b.price - a.price);
        } else if (selectedSort === 'option 3') {
            result.sort((a, b) => a.price - b.price);
        }

        setFilteredTrips(result);
    }, [trips, selectedTheme, selectedSort]);

    return {trips, filteredTrips, themes};
}
