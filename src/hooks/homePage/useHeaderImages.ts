import {useState, useEffect} from 'react';

interface Itinerary {
    id: number;
    name: string;
    description: string;
}

type HeaderPair = {
    firstHeader?: string;
    secondHeader?: string;
};

export function useHeaderImages() {
    const [itineraries, setItineraries] = useState<Itinerary[]>([]);
    const [headerMap, setHeaderMap] = useState<Record<number, HeaderPair>>({});


    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1) Récupère les 3 premiers itineraries
                const res = await fetch('http://localhost:8080/api/itineraries');
                const all: { data: Itinerary[] } = await res.json();
                const slice3 = all.data.slice(0, 3);
                setItineraries(slice3);

                // 2) Construit les URLs directes pour header1 et header2
                const map: Record<number, HeaderPair> = {};
                slice3.forEach(trip => {
                    const id = trip.id;
                    map[id] = {
                        firstHeader: `http://localhost:8080/api/itinerary-images/${id}/header1`,
                        secondHeader: `http://localhost:8080/api/itinerary-images/${id}/header2`,
                    };
                });
                setHeaderMap(map);

            } catch (e) {
                console.error("Erreur useHeaderImages:", e);
            }
        };

        fetchData();
    }, []);

    return {itineraries, headerMap};
}
