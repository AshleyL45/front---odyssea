import {useState, useEffect} from 'react';
import {TripExtended} from './useItineraries';


export function useFilteredTrips(
    trips: TripExtended[],
    selectedTheme: string,
    selectedSort: string
) {
    const [filteredTrips, setFilteredTrips] = useState<TripExtended[]>([]);

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

    return filteredTrips;
}
