import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup, Polyline, useMap} from 'react-leaflet';
import L, {LatLngTuple} from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface InteractiveMapDto {
    dayNumber: number;
    cityName: string;
    latitude: number;
    longitude: number;
}

interface InteractiveMapProps {
    userId: number;
    itineraryId: number;
    className?: string;
}

const FitBounds: React.FC<{ positions: LatLngTuple[] }> = ({positions}) => {
    const map = useMap();
    useEffect(() => {
        if (positions.length > 0) {
            const bounds = L.latLngBounds(positions);
            map.fitBounds(bounds, {padding: [50, 50]});
        }
    }, [positions, map]);
    return null;
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({userId, itineraryId, className}) => {
    const [markers, setMarkers] = useState<InteractiveMapDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/interactive-map/user/${userId}/itinerary/${itineraryId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur réseau");
                }
                return response.json();
            })
            .then((data: InteractiveMapDto[]) => {
                setMarkers(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [userId, itineraryId]);

    const defaultCenter: LatLngTuple = [48.8566, 2.3522];
    const positions: LatLngTuple[] = markers.map(marker => [marker.latitude, marker.longitude] as LatLngTuple);

    const handleMarkerClick = (dayId: number) => {
        window.dispatchEvent(new CustomEvent('scrollToDay', {detail: {dayId}}));
    };


    return (
        <MapContainer
            center={markers.length > 0 ? positions[0] : defaultCenter}
            zoom={6}
            style={{height: '30%', width: '90%'}}
            className={className}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {loading && <p>Chargement des marqueurs...</p>}
            {error && <p>Erreur: {error}</p>}
            {markers.map((marker, index) => (
                <Marker key={index} position={[marker.latitude, marker.longitude]}>
                    <Popup>{`Jour ${marker.dayNumber} : ${marker.cityName}`}</Popup>
                </Marker>
            ))}
            {markers.length > 1 && <Polyline positions={positions}/>}

            {positions.length > 0 && <FitBounds positions={positions}/>}
        </MapContainer>
    );
};

export default InteractiveMap;
