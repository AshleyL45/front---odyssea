import {useMap} from 'react-leaflet';
import {LatLngBounds} from 'leaflet';

interface SetMapBoundsProps {
    bounds: LatLngBounds;
}

const SetMapBounds: React.FC<SetMapBoundsProps> = ({bounds}) => {
    const map = useMap();
    map.fitBounds(bounds, {padding: [50, 50]});
    return null;
};

export default SetMapBounds;
