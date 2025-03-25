// InteractiveMapTrip.tsx
import React, {FC} from 'react';
import {MapContainer, TileLayer, Marker, Popup, Polyline} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, {LatLngTuple, LatLngBounds} from 'leaflet';
import SetMapBounds from './SetMapBounds';
import {City, MarkerData} from '../../@types/City';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


interface InteractiveMapTripProps {
    markers: MarkerData[];
}

const InteractiveMapTrip: FC<InteractiveMapTripProps> = ({markers}) => {
    const parisMarker: MarkerData = {
        dayNumber: 0,
        city: {
            name: 'Paris',
            latitude: 48.8566,
            longitude: 2.3522,
        },
    };

    const allMarkers: MarkerData[] = [parisMarker, ...markers];

    const positions: LatLngTuple[] = allMarkers.map(
        (record) => [record.city.latitude, record.city.longitude]
    );

    const bounds: LatLngBounds =
        positions.length > 0 ? new L.LatLngBounds(positions) : new L.LatLngBounds([[0, 0]]);

    return (
        <MapContainer
            center={[bounds.getCenter().lat, bounds.getCenter().lng]}
            zoom={5}
            style={{height: "700px", width: "40%", zIndex: 0}}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <SetMapBounds bounds={bounds}/>

            {allMarkers.map((record, i) => (
                <Marker key={i} position={[record.city.latitude, record.city.longitude]}>
                    <Popup>
                        {record.dayNumber === 0 ? "Departure" : `${record.city.name} – Day ${record.dayNumber}`}
                    </Popup>
                </Marker>
            ))}

            {positions.length > 1 && (
                <Polyline
                    positions={positions}
                    pathOptions={{dashArray: '5, 5', color: 'blue', weight: 2}}
                />
            )}
        </MapContainer>
    );
};

export default InteractiveMapTrip;