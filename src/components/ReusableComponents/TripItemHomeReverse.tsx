import {FC} from 'react';
import CustomButton from "./CustomButton";
import "../../App.css"
import {Link} from "react-router-dom";

interface TripItemHomeReverseProps {
    id: number;
    name: string;
    description: string;
    headerImage1: string;
    headerImage2: string;
}

const TripItemHomeReverse: React.FC<TripItemHomeReverseProps> = ({id, name, description, headerImage1, headerImage2, ...rest}) => {

    return (
        <div style={{margin: "300px 0"}}>

            <section className="component trip-item-home-reverse" {...rest}>
                <div className="trip-item-home-reverse-photo">
                    <div style={{border: "solid 2px black", backgroundImage: `url(${headerImage1})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center"}}></div>
                    <div style={{border: "solid 2px black", backgroundImage: `url(${headerImage2})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center"}}></div>
                </div>

                <div className="text-home">
                    <h2 style={{fontSize: "25px", margin: "20px 0"}}>{name}</h2>
                    <p style={{marginBottom: "10px"}}>{description}</p>
                    <Link to={`/itineraryDetails/${id}`}>
                        <CustomButton variant="contained">En Savoir Plus</CustomButton>
                    </Link>
                </div>
            </section>

        </div>
    );
};

export default TripItemHomeReverse;
