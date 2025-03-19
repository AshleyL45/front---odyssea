import React, {useEffect} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface MarkerData {
    dayNumber: number;
    cityName: string;
    latitude: number;
    longitude: number;
}

interface InteractiveMapProps {
    markersData: MarkerData[];
    center?: [number, number];
    zoom?: number;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
                                                           markersData,
                                                           center = [48.8566, 2.3522],
                                                           zoom = 5
                                                       }) => {
    useEffect(() => {
        // Crée la carte
        const map = L.map('leaflet-map').setView(center, zoom);

        // Ajoute les tuiles OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Marqueur
        const defaultIcon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        });

        const sortedMarkers = [...markersData].sort((a, b) => a.dayNumber - b.dayNumber);
        const latlngs: L.LatLngExpression[] = [];

        sortedMarkers.forEach(marker => {
            const markerInstance = L.marker([marker.latitude, marker.longitude], {icon: defaultIcon}).addTo(map);
            markerInstance.bindPopup(`<strong>Jour ${marker.dayNumber}</strong>: ${marker.cityName}`);
            latlngs.push([marker.latitude, marker.longitude]);
        });

        if (latlngs.length > 1) {
            L.polyline(latlngs, {color: 'blue'}).addTo(map);
        }

        if (latlngs.length > 0) {
            const bounds = L.latLngBounds(latlngs);
            map.fitBounds(bounds, {padding: [50, 50]});
        }

        return () => {
            map.remove();
        };
    }, [markersData, center, zoom]);

    return <div id="leaflet-map" style={{height: '500px', width: '100%'}}/>;
};

export default InteractiveMap;
