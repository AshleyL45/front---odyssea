import {useState, useEffect} from 'react';
import {get} from '../../API/api';
import {TripExtended} from './useItineraries';

export type HeaderImageMap = Record<number, string>;

export function useItineraryHeaderImage(
    filteredTrips: TripExtended[]
): HeaderImageMap {
    const [headerMap, setHeaderMap] = useState<HeaderImageMap>({});

    useEffect(() => {
        let isMounted = true;
        const objectUrls: string[] = [];

        async function loadHeaders() {
            const map: HeaderImageMap = {};
            await Promise.all(
                filteredTrips.map(async trip => {
                    try {
                        const roles = (await get<string[]>(`/api/itinerary-images/${trip.id}`)) || [];
                        if (!roles.includes('header1')) return;

                        const res = await fetch(`/api/itinerary-images/${trip.id}/header1`);
                        if (!res.ok) {
                            console.error(`Failed to fetch header1 for trip ${trip.id}: HTTP ${res.status}`);
                            return;
                        }
                        const blob = await res.blob();
                        const url = URL.createObjectURL(blob);

                        if (isMounted) {
                            map[trip.id] = url;
                            objectUrls.push(url);
                        }
                    } catch (err) {
                        console.error(`Error loading header1 for trip ${trip.id}:`, err);
                    }
                })
            );
            if (isMounted) {
                setHeaderMap(map);
            }
        }

        loadHeaders();

        return () => {
            objectUrls.forEach(URL.revokeObjectURL);
            isMounted = false;
        };
    }, [filteredTrips]);

    return headerMap;
}
