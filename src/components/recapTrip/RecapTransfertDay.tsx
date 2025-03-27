import {FC} from 'react';
import "../../App.css"
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const MyComponent: FC<{}> = ({}) => {
    return (
        <div>
            <div className="day-step">
                <p className="day-number">
                    <LocationOnOutlinedIcon/>
                    Jour 3
                </p>
                <p><span>Train Varsovie → Cracovie (8h00 - 10h30) en première classe.</span></p>
                <p><span>Hôtel : Hotel Stary</span></p>
                <ul>
                    <li>
                        Un boutique-hôtel 5 étoiles dans un bâtiment historique avec une piscine
                        souterraine
                        et un rooftop offrant une vue magnifique sur la ville.
                    </li>
                </ul>
                <p><span>Visite du château de Wawel et sa cathédrale (2h)</span></p>
                <ul>
                    <li>
                        Résidence des rois de Pologne avec une architecture fascinante.
                    </li>
                </ul>
            </div>

        </div>
    );
};

export default MyComponent;