import {FC} from 'react';
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import "../../App.css"

const RecapFirstDay: FC<{}> = ({}) => {

    return (
        <div>
            <div className="day-step">
                <p className="day-number">
                    <LocationOnOutlinedIcon/>
                    Jour 1
                </p>
                <p><span>Transfert</span> : Chauffeur privé jusqu'à l'hôtel.</p>
                <p><span>Hôtel</span> : Raffles Europejski Warsaw</p>
                <ul>
                    <li>
                        Situé en plein cœur de Varsovie, ce palace historique mêle élégance classique et
                        design contemporain.
                    </li>
                    <li>
                        Spa de luxe, restaurant gastronomique et chambres avec vue sur la vieille ville.
                    </li>
                </ul>

                <p>Soirée libre pour se reposer et explorer les environs.</p>
            </div>

        </div>
    );
};

export default RecapFirstDay;