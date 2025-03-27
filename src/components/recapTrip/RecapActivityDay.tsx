import {FC} from 'react';
import "../../App.css"
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const RecapActivityDay: FC<{}> = ({}) => {

    return (
        <div>
            <div className="day-step">
                <p className="day-number">
                    <LocationOnOutlinedIcon/>
                    Jour 2
                </p>

                <p><span>Petit-déjeuner à l'hôtel</span></p>

                <div>
                    <span>Musée de l’Insurrection de Varsovie (2h)</span>
                    <ul>
                        <li>
                            Un musée immersif retraçant l’histoire bouleversante de la révolte contre
                            l’occupation nazie en 1944.
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default RecapActivityDay;