import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup, Polyline, useMap} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface MarkerData {
    day: number;
    cityName: string;
    lat: number;
    lng: number;
}

interface City {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

interface SetBoundsProps {
    positions: [number, number][];
}

const SetMapBounds: React.FC<SetBoundsProps> = ({positions}) => {
    const map = useMap();
    useEffect(() => {
        if (positions.length > 0) {
            const bounds = L.latLngBounds(positions);
            map.fitBounds(bounds, {padding: [50, 50]});
        }
    }, [positions, map]);
    return null;
};

const getCityById = async (id: number): Promise<City | null> => {
    try {
        const res = await fetch(`http://localhost:8080/cities/${id}`);
        if (!res.ok) throw new Error("Erreur réseau");
        const json = await res.json(); // On attend d'abord le JSON
        return json.data as City;
    } catch (err) {
        console.error(`Erreur fetch city ${id}`, err);
        return null;
    }
};

const InteractiveMapPersItinerary: React.FC = () => {
    const [markers, setMarkers] = useState<MarkerData[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("questionnaireData");
        if (!stored) return;
        const data = JSON.parse(stored);

        let dayCounter = 1;

        const fetchDeparture = async (): Promise<MarkerData | null> => {
            if (!data.departureCity) return null;
            const res = await fetch("http://localhost:8080/cities");
            const allCities = await res.json();
            const match = allCities.data.find(
                (c: any) =>
                    (c.name || c.cityName)?.toLowerCase() === data.departureCity.toLowerCase()
            );
            if (!match) return null;
            const city = await getCityById(match.id);
            if (!city) return null;
            return {
                day: dayCounter++,
                cityName: city.name,
                lat: city.latitude,
                lng: city.longitude,
            };
        };

        const fetchSelectedCities = async (): Promise<MarkerData[]> => {
            const cityMarkers: MarkerData[] = [];
            const countries = data.countrySelection || [];

            for (const country of countries) {
                const key = `selectedCities_${country.id}`;
                const local = localStorage.getItem(key);
                if (!local) continue;

                const cities = JSON.parse(local);
                for (const city of cities) {
                    const cityData = await getCityById(city.id);
                    if (cityData) {
                        cityMarkers.push({
                            day: dayCounter++,
                            cityName: cityData.name,
                            lat: cityData.latitude,
                            lng: cityData.longitude,
                        });
                    }
                }
            }
            return cityMarkers;
        };

        const fetchAllMarkers = async () => {
            const departure = await fetchDeparture();
            const cities = await fetchSelectedCities();
            const all = departure ? [departure, ...cities] : cities;
            setMarkers(all);
        };

        fetchAllMarkers();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
        }, 300);
    }, []);

    const positions = markers.map((m) => [m.lat, m.lng] as [number, number]);

    return (
        <div style={{height: "500px", width: "100%"}}>
            <MapContainer center={[48.8566, 2.3522]} zoom={5} style={{height: "100%", width: "100%"}}
                          zoomAnimation={false}
                          zoomControl={false}
                          fadeAnimation={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
                <SetMapBounds positions={positions}/>
                {positions.length > 1 && (
                    <Polyline positions={positions} pathOptions={{dashArray: "5, 5", color: "blue"}}/>
                )}
                {markers.map((marker) => (
                    <Marker key={marker.day} position={[marker.lat, marker.lng]}>
                        <Popup>{`Day ${marker.day} - ${marker.cityName}`}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default InteractiveMapPersItinerary;
